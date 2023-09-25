import { Module } from '@nestjs/common';
import { ProductimagesService } from './productimages.service';
import { ProductimagesController } from './productimages.controller';
import { DatabaseModule } from '../typeorms/database.module';
import { productImageProviders } from './productimages.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductimagesController],
  providers: [ProductimagesService,...productImageProviders],
})
export class ProductimagesModule {}
