import { Global, Module } from '@nestjs/common';
import { DiscordService1 } from './discord.service'; 


@Global()
@Module({
    imports:[],
  controllers: [],
  providers: [DiscordService1],
  exports:[DiscordService1],
})
export class DiscordModule2 {}
