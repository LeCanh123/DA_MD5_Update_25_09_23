import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '../typeorms/database.module';
import { UserSocketGateway } from './user.socket';
import { cartProviders } from '../carts/carts.providers';
import { CartsService } from '../carts/carts.service';
import { bagsProviders } from '../bags/bags.providers';
import { userProviders } from '../users/users.providers';
import { PurchaseService } from '../purchase/purchase.service';
import { purchaseProviders } from '../purchase/purchase.providers';

// @Global()
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [UserSocketGateway,CartsService,...bagsProviders,...userProviders,...cartProviders,
    PurchaseService,...purchaseProviders

],
  exports:[UserSocketGateway],
})
export class CartSocketModule {}