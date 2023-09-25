import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BagsService } from './bags.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

@Controller('bags')
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Post()
  create(@Body() createBagDto: CreateBagDto) {
    return this.bagsService.create(createBagDto);
  }

  @Get()
  findAll() {
    return this.bagsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBagDto: UpdateBagDto) {
    return this.bagsService.update(+id, updateBagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bagsService.remove(+id);
  }
}
