import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket} from 'socket.io'
import jwt from "src/services/jwt";
import { DiscordService1 } from "../discord/discord.service";
import { User } from "../users/entities/user.entity";
import { CustomerService } from "./customer.service"; 
import { BoxchatGateWay } from "src/gateway/boxchat.gateway";


@WebSocketGateway(3002,{
    cors: true
})

export class CustomerGateway implements OnModuleInit {
    socketClients:any= [];
    constructor( 
        private readonly discord: DiscordService1,
         private readonly customerService:CustomerService
         
         ) {}

    @WebSocketServer()
    server: Server

    // onModuleInit() {}
    onModuleInit() {
        this.server.on("connect", async (socket) => {

            //nếu body gửi lên là admin
            if(String(socket.handshake.query.token) == "admin") {
                console.log("admin connected")
                return
            }
            let userDecode = jwt.verifyToken(String(socket.handshake.query.token))
            // this.discord.createTextChannel(String(userDecode.firstName + userDecode.lastName))
            
            if(!userDecode) {
                socket.emit("connectStatus", "Bạn không có quyền truy cập!")
            }else {
                //tìm lịch sử
                let customerSerRes:any = await this.customerService.findChatHistory(userDecode.id);

                // Lưu lại socket để có thể sử dụng về sau
                let newSocketClient = {
                    user: userDecode,
                    socket,
                    textChannelDiscordId: customerSerRes.status ? 
                    customerSerRes.data[0].textChannelDiscordId 
                    :
                     (await this.discord.createTextChannel(String(userDecode.firstName +" "+ userDecode.lastName)))?.id
                } 

                this.socketClients.push(newSocketClient)

                //nếu không có lịch sử nhắn 1 câu mở đầu
                if(!customerSerRes.status) {
                     // nhắn 1 tin chào khách - save to db, send to discord channel
                     //lưu vào database trước khi nhắn
                    let serResChat = await this.customerService.create({
                        adminId: "canh",
                        content: "Xin chào bạn cần giúp đỡ gì",
                        textChannelDiscordId: newSocketClient?.textChannelDiscordId,
                        time: String(Date.now()),
                        type: "ADMIN",
                        userId: newSocketClient.user.id
                    })
                    console.log("serResChat",serResChat);
                    
                    //id của kênh chat mỗi người newSocketClient.textChannelDiscordId
                    //sau khi lưu vào database gửi tin nhắn đi
                    let channel = this.discord.getTextChannel(newSocketClient?.textChannelDiscordId);
                    channel?.send(`Admin:${serResChat?.data?.content}`)

                    let customerSerRes2 = await this.customerService.findChatHistory(userDecode.id);

                    socket.emit("historyMessage", customerSerRes2.data)
                }else {
                    socket.emit("historyMessage", customerSerRes.data)
                }
               

                // trả về cho người dùng
                socket.emit("connectStatus", `Chào mừng ${String(userDecode.firstName +" "+ userDecode.lastName)} đã kết nối!`)
            }
            // console.log(`Client có socket id là: ${socket.id} vừa kết nối!`)
            
        })
    }

    @SubscribeMessage('onMessage')
    async onMessage(@MessageBody() body: any) {
        console.log("body onMessage",body);
        
        let socketClient:any = this.socketClients.find(client => client?.socket?.id == body?.socketId)
        let newChatRecourd = {
            adminId: "",
            content: body.content,
            textChannelDiscordId: String(socketClient?.textChannelDiscordId),
            time: String(Date.now()),
            type: "USER",
            userId: body.userId
        }
       
        await this.customerService.create(newChatRecourd);
        let chatHistory = await this.customerService.findChatHistory(newChatRecourd.userId);
        this.discord.getTextChannel(String(socketClient?.textChannelDiscordId))?.send(
            `${socketClient.user.firstname + " " + socketClient.user.lastname}:  ${newChatRecourd.content}`
            )
        socketClient.socket.emit("historyMessage", chatHistory.data)
    }
 
    @SubscribeMessage('onAdminMessage')
    async adminSendMessage(@MessageBody() body: any) {
        let socketClient = this.socketClients.find(client => client?.textChannelDiscordId == body.channelId)
        let newChatRecourd = {
            adminId: "",
            content: body.content,
            textChannelDiscordId: String(socketClient?.textChannelDiscordId),
            time: String(Date.now()),
            type: "ADMIN",
            userId: socketClient.user.id
        }
       
        await this.customerService.create(newChatRecourd);
        let chatHistory = await this.customerService.findChatHistory(newChatRecourd.userId);
        console.log("đã vào!", chatHistory.data.length)
        // console.log('socketClient', socketClient)
        //chatHistory.data lấy từ database trả về
        // console.log("chatHistory",chatHistory);
        
        socketClient.socket.emit("historyMessage", chatHistory.data)
    }

}

//gửi đi
//nhận lại

//admin gửi đi thế nào