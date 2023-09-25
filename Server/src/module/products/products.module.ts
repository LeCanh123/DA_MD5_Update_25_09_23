import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from '../typeorms/database.module'; 
import { productProviders } from './products.providers';
import { productImageProviders } from '../productimages/productimages.providers';
import { categoryProviders } from '../category/category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService,...productProviders,...productImageProviders,...categoryProviders],
})
export class ProductsModule {}
