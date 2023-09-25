import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductimagesService } from './productimages.service';
import { CreateProductimageDto } from './dto/create-productimage.dto';
import { UpdateProductimageDto } from './dto/update-productimage.dto';

@Controller('productimages')
export class ProductimagesController {
  constructor(private readonly productimagesService: ProductimagesService) {}

  @Post()
  create(@Body() createProductimageDto: CreateProductimageDto) {
    return this.productimagesService.create(createProductimageDto);
  }

  @Get()
  findAll() {
    return this.productimagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productimagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductimageDto: UpdateProductimageDto) {
    return this.productimagesService.update(+id, updateProductimageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productimagesService.remove(+id);
  }
}
