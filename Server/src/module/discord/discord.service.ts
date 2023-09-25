import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChannelType, Client, GatewayIntentBits, Guild } from 'discord.js';


@Injectable()
export class discordService implements OnModuleInit {
    client:Client<boolean>
    Md5_nest:string="MTE1Mzk4ODU2NjgyNTgyODQyNA.GKT7jT.8qHSgh7MfhtUMMeZpS3oNoWQz8hVIDMujfE8sg"
    guildId:string="1141668475060887582";
    guild: Guild
   
   
    onModuleInit(){
        this.client = new Client({ 
            intents: [
                GatewayIntentBits.Guilds, 
                GatewayIntentBits.GuildMessages, 
                GatewayIntentBits.MessageContent,
            ],
        });

        this.client.login(this.Md5_nest);
        this.client.on("ready",async ()=>{
            console.log("đã vào discord");
            this.createGuild();
            await this.createTextChannel("Khach hang 2")
        })
    }

    async createTextChannel(channelName: string) {
        return await this.guild.channels.create({
           name: channelName,
           type: ChannelType.GuildText	
       })
     }
   

    async createGuild(){
        this.guild=this.client.guilds.cache.get(this.guildId)
    }

}
