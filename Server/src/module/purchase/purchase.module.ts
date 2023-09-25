import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { purchaseProviders } from './purchase.providers';
import { DatabaseModule } from '../typeorms/database.module';
import { cartProviders } from '../carts/carts.providers';
import { userProviders } from '../users/users.providers';
import { bagsProviders } from '../bags/bags.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [PurchaseService,...purchaseProviders,...cartProviders,...userProviders,...bagsProviders],
})
export class PurchaseModule {}
