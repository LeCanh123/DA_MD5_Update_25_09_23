import { Injectable } from '@nestjs/common';
import { CreateProductimageDto } from './dto/create-productimage.dto';
import { UpdateProductimageDto } from './dto/update-productimage.dto';

@Injectable()
export class ProductimagesService {
  create(createProductimageDto: CreateProductimageDto) {
    return 'This action adds a new productimage';
  }

  findAll() {
    return `This action returns all productimages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productimage`;
  }

  update(id: number, updateProductimageDto: UpdateProductimageDto) {
    return `This action updates a #${id} productimage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productimage`;
  }
}
