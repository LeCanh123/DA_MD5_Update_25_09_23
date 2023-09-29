import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './module/products/products.module';
import { UsersModule } from './module/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './module/category/category.module';
import { GateWayModule1 } from './module/gateway/gatetway.module';
import { CartsModule } from './module/carts/carts.module';
import { PurchaseModule } from './module/purchase/purchase.module';


@Module({
  imports: [ConfigModule.forRoot(),ProductsModule,UsersModule,CategoryModule,
  CartsModule,
  PurchaseModule,
  GateWayModule1
  // DiscordModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
