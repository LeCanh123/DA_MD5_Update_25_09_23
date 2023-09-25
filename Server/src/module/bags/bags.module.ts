import { Module } from '@nestjs/common';
import { BagsService } from './bags.service';
import { BagsController } from './bags.controller';
import { bagsProviders } from './bags.providers';

@Module({
  controllers: [BagsController],
  providers: [BagsService,...bagsProviders],
})
export class BagsModule {}
