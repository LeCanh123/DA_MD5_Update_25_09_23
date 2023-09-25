import { Inject, Injectable } from '@nestjs/common';
import { GateWay1 } from './entities/gateway.entity';
import { Repository } from 'typeorm';


@Injectable()
export class customerService {

  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private userRepository: Repository<GateWay1>,
  ) {}
  
  // create(createBagDto: CreateBagDto) {
  //   return 'This action adds a new bag';
  // }

  // findAll() {
  //   return `This action returns all bags`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} bag`;
  // }

  // update(id: number, updateBagDto: UpdateBagDto) {
  //   return `This action updates a #${id} bag`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bag`;
  // }
}
