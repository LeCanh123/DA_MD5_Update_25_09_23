import { Inject, Injectable } from '@nestjs/common';
import { GateWay1 } from './entities/gateway.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CustomerService {

  constructor(
    @Inject('GATEWAY_REPOSITORY')
    private readonly  gateWayRepository: Repository<GateWay1>,

  ) {}
  
  async findChatHistory(userId: string) {
    try {
      let chatHistory = await this.gateWayRepository.find({
        where: {
          user:{id:userId}
        },
        order: {
            time: "ASC"
        },
        relations: ['user'],
      })

      if(chatHistory.length == 0) {
        return {
          status: false,
          data: null
        }
      }else {
        return {
          status: true,
          data: chatHistory
        }
      }
    }catch(err) {
      return {
        status: false,
        data: null
      }
    }
  }

  //lưu vào database
  async create(data) {
    try {
      let chatRecord = await this.gateWayRepository.save(
        {
          adminId: data.adminId,
          content: data.content,
          textChannelDiscordId: data.textChannelDiscordId,
          time: data.time,
          type: data.type,
          user:{id:data.userId}
          // userId: '1769e9b9-f2a6-4446-a81e-f91894891293',
          // id: '776ed131-9783-4cc5-ac89-1882eee2d2da'
        }
      );

      return {
        status: true,
        data: chatRecord
      }
    }catch(err) {
      return {
        status: false,
        data: null
      }
    }
  }
}
