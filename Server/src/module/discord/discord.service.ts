import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChannelType, Client, GatewayIntentBits, Guild, TextChannel } from 'discord.js';
import {Socket, io} from 'socket.io-client'

@Injectable()
export class DiscordService1 implements OnModuleInit { 
  client: Client<boolean>;
  botToken:string ="MTE1Mzk4ODU2NjgyNTgyODQyNA.GBSdYJ.tT6PAPRE_ePJfcvF_6cH7VDNTgsSLjVgb4uqrA"
  guildId:string= "1141668475060887582"

  guild:Guild 

  socketServer: Socket | null = null;
  constructor(){}

  onModuleInit() {
    this.client = new Client({  
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.MessageContent,
        ],
    });

    this.client.login(this.botToken); //login

    this.client.on('ready', async () => {
        console.log("Discord Anh Canh Shop Assittan Connected!")

        this.createGuild()
        this.socketServer = io("http://127.0.0.1:3002?token=admin")

        this.client.on('messageCreate', (message) => {
          
          if(!message.author.bot) {
            this.socketServer?.emit("onAdminMessage", {
              channelId: message.channelId,
              content: message.content
            })
          } 
          
          // this.customerGateway.adminSendMessage(channelId, content)
        })
    }); 
  }

  createGuild() {
    this.guild =  this.client.guilds.cache.get(this.guildId);
  }

  async createTextChannel(channelName: string) {
     return await this.guild?.channels.create({
        name: channelName,
        type: ChannelType.GuildText	
    })
  }

  getTextChannel(channelId: string) {
    let channel = this.guild?.channels.cache.get(channelId);
    return (channel as TextChannel)
  }
}

 