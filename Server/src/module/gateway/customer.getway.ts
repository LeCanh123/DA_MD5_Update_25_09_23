import { OnModuleInit } from "@nestjs/common";
import { Socket } from "net";
import { Server } from "socket.io";
import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets"
import { subscribe } from "diagnostics_channel";





@WebSocketGateway(3002,{

    cors:true
})

export class CustomerGateWay implements OnModuleInit {

    @WebSocketServer()
    server:Server

    onModuleInit(){
        this.server.on("connect",(socket)=>{
            console.log(`tk cos id ${socket.id} vừa kết nối`);
            socket.emit("connectStatus",`Chào mừng ${"anh Cảnh"} đã kết nối`)
        })
    }
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log("body", body)
        this.server.emit("loadMessage", body)
    }
}