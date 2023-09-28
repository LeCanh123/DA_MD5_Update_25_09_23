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
            console.log("user connected")
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
                     (await this.discord.createTextChannel(String(userDecode.firstname +" "+ userDecode.lastname)))?.id
                } 

                this.socketClients.unshift(newSocketClient)

                //nếu không có lịch sử nhắn 1 câu mở đầu
                if(!customerSerRes.status) {
                    console.log("vào customerSerRes.status 2 lần");
                    
                     // nhắn 1 tin chào khách - save to db, send to discord channel
                     //lưu vào database trước khi nhắn
                    let serResChat = await this.customerService.create({
                        adminId: "canh",
                        content: "Xin chào bạn cần giúp đỡ gì",
                        textChannelDiscordId: newSocketClient?.textChannelDiscordId,
                        time: String(Date.now()),
                        type: "ADMIN",
                        userId: newSocketClient?.user?.id
                    })
                    console.log("serResChat",serResChat);
                    
                    //id của kênh chat mỗi người newSocketClient.textChannelDiscordId
                    //sau khi lưu vào database gửi tin nhắn đi
                    let channel = this.discord.getTextChannel(newSocketClient?.textChannelDiscordId);
                    channel?.send(`Admin:${serResChat?.data?.content}`)

                    let customerSerRes2 = await this.customerService.findChatHistory(userDecode.id);

                    socket.emit("historyMessage", customerSerRes2.data)
                //nếu có lịch sử
                }else {
                    socket.emit("historyMessage", customerSerRes.data)
                }
               

                // trả về cho người dùng
                socket.emit("connectStatus", `Chào mừng ${String(userDecode.firstname +" "+ userDecode.lastname)} đã kết nối!`)
            }
            // console.log(`Client có socket id là: ${socket.id} vừa kết nối!`)
            
        })
    }

    //theo dõi tin nhắn đính kèm token để phân biệt người dùng
    //người dùng gửi lên chắc chắn nhận
    @SubscribeMessage('onMessage')
    async onMessage(@MessageBody() body: any) {
        console.log("body onMessage",body);
        

        //giữ lại duy nhất
        let foundFirstElement = false;
        this.socketClients = this.socketClients?.filter(client => {
        if (client?.socket?.id === body?.socketId && !foundFirstElement) {
        foundFirstElement = true;
        return true; // Giữ lại phần tử đầu tiên tìm thấy
        }
        return client?.socket?.id !== body?.socketId; // Loại bỏ các phần tử trùng id
        });



        let socketClient:any = this.socketClients?.find(client => client?.socket?.id == body?.socketId)
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
            `${socketClient?.user?.firstname + " " + socketClient?.user?.lastname}:  ${newChatRecourd.content}`
            )
        socketClient?.socket?.emit("historyMessage", chatHistory.data)
    }
 
    @SubscribeMessage('onAdminMessage') 
    async adminSendMessage(@MessageBody() body: any) {
        console.log("vào onadminmessage");
        
        let socketClient = this.socketClients?.find(client => client?.textChannelDiscordId == body.channelId)

        //giữ lại duy nhất
        let foundFirstElement = false;
        this.socketClients = this.socketClients?.filter(client => {
        if (client.textChannelDiscordId == body?.channelId && !foundFirstElement) {
        foundFirstElement = true;
        return true; // Giữ lại phần tử đầu tiên tìm thấy
        }
        return client?.textChannelDiscordId != body?.channelId; // Loại bỏ các phần tử trùng id
        });


        let newChatRecourd = {
            adminId: "",
            content: body.content,
            textChannelDiscordId: String(socketClient?.textChannelDiscordId),
            time: String(Date.now()),
            type: "ADMIN",
            userId: socketClient?.user?.id
        }
       
        console.log("newChatRecourd",newChatRecourd);
        
        let listChatHistory=await this.customerService.create(newChatRecourd);
        console.log("listChatHistory",listChatHistory);
        
        let chatHistory = await this.customerService.findChatHistory(newChatRecourd.userId);
        console.log("đã vào!", chatHistory.data.length)
        //chatHistory.data lấy từ database trả về
        console.log("admin historyMessage");
        
        socketClient?.socket?.emit("historyMessage", chatHistory.data)
        console.log("socketClient",socketClient);
        console.log("this.socketClients",this.socketClients);
        console.log("body.channelId",body.channelId);
        
    } 





    //lấy từ cổng lắng nghe discord gửi lại vào onAdminMessage
    // @SubscribeMessage('onAdminMessage') 
    // async adminSendMessage(@MessageBody() body: any) {
    //     console.log("vào onadminmessage");
        
    //     let socketClient = this.socketClients?.find(client => client?.textChannelDiscordId == body.channelId)
    //     let newChatRecourd = {
    //         adminId: "",
    //         content: body.content,
    //         textChannelDiscordId: String(socketClient?.textChannelDiscordId),
    //         time: String(Date.now()),
    //         type: "ADMIN",
    //         userId: socketClient?.user?.id
    //     }
       
    //     await this.customerService.create(newChatRecourd);
    //     let chatHistory = await this.customerService.findChatHistory(newChatRecourd.userId);
    //     console.log("đã vào!", chatHistory.data.length)
    //     //chatHistory.data lấy từ database trả về
    //     console.log("admin historyMessage");
        
    //     socketClient?.socket?.emit("historyMessage", chatHistory.data)
    // } 

}

//gửi đi
//nhận lại

//admin gửi đi thế nào