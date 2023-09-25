import { Global, Module } from '@nestjs/common';
import { discordService } from './discord.service';


@Global()
@Module({
    imports:[],
  controllers: [],
  providers: [discordService],
  exports:[discordService],
})
export class DiscordModule {}
