import { Global, Module } from '@nestjs/common';
import { CustomerGateWay } from './customer.getway';
import { customerProviders } from './customer.providers';
import { DatabaseModule } from '../typeorms/database.module';
// import { discordService } from './discord.service';


@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [CustomerGateWay,...customerProviders],
  exports:[],
})
export class GateWayModule1 {}
