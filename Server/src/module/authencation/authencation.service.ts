import { Injectable } from '@nestjs/common';
import { CreateAuthencationDto } from './dto/create-authencation.dto';
import { UpdateAuthencationDto } from './dto/update-authencation.dto';

@Injectable()
export class AuthencationService {
  create(createAuthencationDto: CreateAuthencationDto) {
    return 'This action adds a new authencation';
  }

  findAll() {
    return `This action returns all authencation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authencation`;
  }

  update(id: number, updateAuthencationDto: UpdateAuthencationDto) {
    return `This action updates a #${id} authencation`;
  }

  remove(id: number) {
    return `This action removes a #${id} authencation`;
  }
}
