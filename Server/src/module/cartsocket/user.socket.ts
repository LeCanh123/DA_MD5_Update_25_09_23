import { Inject, OnModuleInit } from "@nestjs/common";
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
import { CartsService } from "../carts/carts.service"; 
import { Cart } from "../carts/entities/cart.entity";
import { Bag } from "../bags/entities/bag.entity";
import { User } from "../users/entities/user.entity";
import { Address } from "nodemailer/lib/mailer";
import { PurchaseService } from "../purchase/purchase.service";


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
        @Inject('PURCHASE_REPOSITORY')
        private addressRepository: Repository<Address>,
        // private readonly cartsService: CartsService
        @Inject('CART_REPOSITORY')
        private cartRepository: Repository<Cart>,
    
        @Inject('BAG_REPOSITORY')
        private bagRepository: Repository<Bag>,
    
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,

        private readonly purchaseService: PurchaseService
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

                /* Lưu trữ thông tin người dùng vừa kết nối để tương tác về sau */
                this.clients.push({
                    socket,
                    user,
                    total
                })
                socket.on("payZalo" , async (data: any) => {
                    console.log("vaof pay zalo",data);
                    //giải nén token
                    let unpack:any= jwt.verifyToken(data.token);
                    if(unpack){
                        //tìm giỏ hàng và tính tổng đơn
                        let findUserBag:any=await this.bagRepository.find({where:{user:{id:unpack.id},block:"null"}});
                        //nếu không tìm thấy giỏ
                        if(findUserBag.length==0){
                            //emit đến người dùng không có sp trong giỏ
                        }
                        //nếu tìm thấy giỏ
                        else{
                          //tìm sản phẩm trong giỏ
                          let findUserCart=await this.cartRepository.find({where:{bag:{id:findUserBag[0].id}},
                                                                          relations: ['products','products.productimage']
                                                                      });
                        //tính tổng đơn hàng
                        let sumTotalCart=findUserCart.reduce((total:any, e:any) => {
                            console.log(e.quantity);
                              return total + e.products?.price * e.quantity}, 0);
                        if(sumTotalCart==0){
                            //emit đến người dùng không có sp trong giỏ
                        }else{
                            //tạo đơn zalo
                            let zaloCash = await this.zaloCash(user, Number(sumTotalCart),socket);
                            console.log("zalocash",zaloCash);
                            
                            if(zaloCash) {
                            //lưu vào database
                            console.log("data",data);
                            this.purchaseService.addOrder({
                                token:data.token,
                                data:{
                                   ...data.useraddress 
                                }
                            })

                                for (let i in this.clients) {
                                    if(this.clients[i].user.id == user.id) {
                                        this.clients[i].socket.emit("receiveCart", zaloCash[0])
                                        this.clients[i].socket.emit("receiveReceipt", zaloCash[1])
                                        this.clients[i].socket.emit("cash-status", true)
                                    }
                                }
                            }

                        } 
     
                
                        } 
                    }
                    else{
                        //emit cho người dùng chưa đăng nhập
                    }
   
                })




            }
        })
    } 

    async zaloCash( user,total, socket: Socket) {
        let finish:boolean = false;
        let result = null;


        let zaloRes = await this.zaloCreateReceipt(user, total);
        console.log("zaloRes",zaloRes);

        if(!zaloRes) return false
        /* Bước 2: Gửi thông tin thanh toán về cho client*/
        socket.emit("payQr", zaloRes.payUrl)
        /* Bước 3: Kiểm tra thanh toán*/
        let payInterval: NodeJS.Timeout | null = null;

        /* Sau bao lâu thì hủy giao dịch! */
        setTimeout(() => {
            socket.emit("payQr", null)
            clearInterval(payInterval)
            finish = true;
        }, 1000 * 60 * 2)

        let intervalId = setInterval(async () => {
            let payStatus =
            await this.zaloCheckPaid(zaloRes.orderId);
            // payStatus = true;
            // console.log("payStatus", payStatus);
            if (payStatus) {
                // lưu vào database 

                finish = true; 
                clearInterval(intervalId); // Dừng vòng lặp setInterval
                return;
            }
        }, 1000);

        return new Promise((resolve, reject) => { 
            let intervalId = setInterval(() => { 
                console.log("finish",finish);
                
                if(finish) {
                    resolve("result") 
                    clearInterval(intervalId); // Dừng vòng lặp setInterval
                }
            }, 1000)
        })
    }

    //trả về mã qr
    async zaloCreateReceipt(user,total:number) {
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
            apptransid: `${moment().format('YYMMDD')}_${Date.now()*Math.random()}_`,
            appuser: "userName",
            apptime: Date.now(),
            item: JSON.stringify([]),
            embeddata: JSON.stringify({
                merchantinfo: "Clothes Shop" // key require merchantinfo
            }),
            amount: Number(total*23000),
            description: "Thanh Toán Cho Clothes Shop",
            bankcode: "zalopayapp",
            mac: ""
        }; 
    
        const data = config.appid + "|" + orderInfo.apptransid + "|" + orderInfo.appuser + "|" + 
        orderInfo.amount + "|" + orderInfo.apptime + "|" + orderInfo.embeddata + "|" + orderInfo.item;
        orderInfo.mac = CryptoJS.HmacSHA256(data, String(config.key1)).toString();
    
        await axios.post(String(config.create), null, { params: orderInfo })
            .then(zaloRes => {
                // console.log("zaloReszaloRes",zaloRes);
                
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