import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthencationService } from './authencation.service';
import { CreateAuthencationDto } from './dto/create-authencation.dto';
import { UpdateAuthencationDto } from './dto/update-authencation.dto';

@Controller('authencation')
export class AuthencationController {
  constructor(private readonly authencationService: AuthencationService) {}

  @Post()
  create(@Body() createAuthencationDto: CreateAuthencationDto) {
    return this.authencationService.create(createAuthencationDto);
  }

  @Get()
  findAll() {
    return this.authencationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authencationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthencationDto: UpdateAuthencationDto) {
    return this.authencationService.update(+id, updateAuthencationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authencationService.remove(+id);
  }
}
 