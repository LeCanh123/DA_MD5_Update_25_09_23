import { Global, Module } from '@nestjs/common';
import { CustomerGateway } from './customer.gateway';
import { gateWayProviders } from './gateway.providers'; 
import { DatabaseModule } from '../typeorms/database.module';
import { CustomerService } from './customer.service';
import { DiscordService1 } from '../discord/discord.service';
// import { discordService } from './discord.service';


// @Global()
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...gateWayProviders,CustomerService,CustomerGateway,DiscordService1],
  exports:[CustomerGateway],
})
export class GateWayModule1 {}
