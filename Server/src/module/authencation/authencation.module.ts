import { Module } from '@nestjs/common';
import { AuthencationService } from './authencation.service';
import { AuthencationController } from './authencation.controller';

@Module({
  controllers: [AuthencationController],
  providers: [AuthencationService],
})
export class AuthencationModule {}
