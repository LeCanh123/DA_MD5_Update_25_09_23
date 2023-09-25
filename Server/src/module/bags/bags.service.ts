import { Injectable } from '@nestjs/common';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

@Injectable()
export class BagsService {
  create(createBagDto: CreateBagDto) {
    return 'This action adds a new bag';
  }

  findAll() {
    return `This action returns all bags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bag`;
  }

  update(id: number, updateBagDto: UpdateBagDto) {
    return `This action updates a #${id} bag`;
  }

  remove(id: number) {
    return `This action removes a #${id} bag`;
  }
}
