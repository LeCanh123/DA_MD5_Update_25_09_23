import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DatabaseModule } from '../typeorms/database.module';
import { categoryProviders } from './category.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService,...categoryProviders],
})
export class CategoryModule {}
