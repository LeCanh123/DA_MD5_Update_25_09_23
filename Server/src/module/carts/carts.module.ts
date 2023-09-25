import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { BagsModule } from '../bags/bags.module';
import { UsersModule } from '../users/users.module';
import { bagsProviders } from '../bags/bags.providers';
import { userProviders } from '../users/users.providers';
import { DatabaseModule } from '../typeorms/database.module';
import { cartProviders } from './carts.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CartsController],
  providers: [CartsService,...bagsProviders,...userProviders,...cartProviders],
})
export class CartsModule {}
