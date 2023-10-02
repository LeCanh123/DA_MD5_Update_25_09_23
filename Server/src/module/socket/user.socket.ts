import { OnModuleInit } from "@nestjs/common";
import jwt from "src/services/jwt";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
// import { User } from "src/modules/user/entities/user.entity";
// import { InjectRepository } from "@nestjs/typeorm";
// import { PayMode, Receipt, ReceiptStatus } from "src/modules/receipts/entities/receipt.entity";
import { Not, Repository } from "typeorm";
// import { ReceiptDetail } from "src/modules/receipts/entities/receipt-detail.entity";
import * as moment from "moment";
import * as CryptoJS from "crypto-js";
import axios from "axios";
import * as qs from "qs";
interface ClientType {
    user,
    socket: Socket,
    total:Number,
}
@WebSocketGateway(3001, { cors: true })
export class UserSocketGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server
    clients: ClientType[] = [];

    constructor(
        // private readonly jwt: jwt,
        // @InjectRepository(Receipt) private readonly receipts: Repository<Receipt>,
        // @InjectRepository(ReceiptDetail) private readonly receiptDetail: Repository<ReceiptDetail>
    ) { }

    onModuleInit() {
        this.server.on("connect", async (socket: Socket) => {
            console.log("Đã có người connect")
            /* Xóa người dùng khỏi clients nếu disconnect */
            socket.on("disconnect", () => {
                console.log("có 1 user đã out!")
                this.clients = this.clients.filter(client => client.socket.id != socket.id)
            })

            /* Xác thực người dùng */
            let token: string = String(socket.handshake.query.token);
            let total: Number = Number(socket.handshake.query.total);
            let user = (jwt.verifyToken(token));
            if (token == "undefined" || !user) {
                socket.emit("connectStatus", {
                    message: "Đăng nhập thất bại",
                    status: false
                })
                socket.disconnect();
            } else {
                // if(this.clients.find(client => client.user.id == user.id)) {
                //     socket.emit("connectStatus", {
                //         message: "Đã đăng nhập ở 1 thiết bị khác!",
                //         status: false
                //     })
                //     socket.disconnect()
                //     return
                // } 
                /* Lưu trữ thông tin người dùng vừa kết nối để tương tác về sau */
                this.clients.push({
                    socket,
                    user,
                    total
                })
                socket.on("payZalo" , async (data: {
                    receiptId: string
                }) => {
                    let zaloCash = await this.zaloCreateReceipt(data.receiptId, user, Number(total));
                    if(zaloCash) {
                        for (let i in this.clients) {
                            if(this.clients[i].user.id == user.id) {
                                this.clients[i].socket.emit("receiveCart", zaloCash[0])
                                this.clients[i].socket.emit("receiveReceipt", zaloCash[1])
                                this.clients[i].socket.emit("cash-status", true)
                            }
                        }
                    }
                })




            }
        })
    }



    async zaloCreateReceipt(user, receipt,total:number) {
        let result: {
            payUrl: string;
            orderId: string;
        } | null = null;
        const config = {
            appid: process.env.ZALO_APPID,
            key1: process.env.ZALO_KEY1,
            key2: process.env.ZALO_KEY2,
            create: process.env.ZALO_CREATE_URL,
            confirm: process.env.ZALO_COFIRM_URL,
        };
    
        const orderInfo = {
            appid: config.appid,
            apptransid: `${moment().format('YYMMDD')}_${Date.now()*Math.random()}_${receipt.id}`,
            appuser: user.userName,
            apptime: Date.now(),
            item: JSON.stringify([]),
            embeddata: JSON.stringify({
                merchantinfo: "Clothes Shop" // key require merchantinfo
            }),
            amount: Number(total),
            description: "Thanh Toán Cho Clothes Shop",
            bankcode: "zalopayapp",
            mac: ""
        };
    
        const data = config.appid + "|" + orderInfo.apptransid + "|" + orderInfo.appuser + "|" + 
        orderInfo.amount + "|" + orderInfo.apptime + "|" + orderInfo.embeddata + "|" + orderInfo.item;
        orderInfo.mac = CryptoJS.HmacSHA256(data, String(config.key1)).toString();
    
        await axios.post(String(config.create), null, { params: orderInfo })
            .then(zaloRes => {
               if(zaloRes.data.returncode == 1) {
                    result = {
                        payUrl: zaloRes.data.orderurl,
                        orderId: orderInfo.apptransid
                    }
                }
            })
        return result
    }

    async zaloCheckPaid(zaloTransid: string) {
        const config = {
            appid: process.env.ZALO_APPID,
            key1: process.env.ZALO_KEY1,
            key2: process.env.ZALO_KEY2,
            create: process.env.ZALO_CREATE_URL,
            confirm: process.env.ZALO_COFIRM_URL,
        };
    
        let postData = {
            appid: config.appid,
            apptransid: zaloTransid,
            mac: ""
        }
    
        let data = config.appid + "|" + postData.apptransid + "|" + config.key1; // appid|apptransid|key1
        postData.mac = CryptoJS.HmacSHA256(data, String(config.key1)).toString();
    
    
        let postConfig = {
            method: 'post',
            url: String(config.confirm),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: String(qs.stringify(postData))
        };
    
        return await axios.post(postConfig.url, postConfig.data)
            .then(function (resZalo) {
                if(resZalo.data.returncode == 1) return true
                return false
            })
            .catch(function (error) {
                return false
            });
    }
} 