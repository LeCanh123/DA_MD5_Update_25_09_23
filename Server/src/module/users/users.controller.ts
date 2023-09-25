import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import {  LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request,Response } from 'express';
import { ApiBody, ApiExtraModels, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import * as path from 'path';
import { TokenUserDto } from './dto/token-user.dto';
import { CreateChangeInfoUserDto } from './dto/create-user.dto copy';





@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiExtraModels(CreateUserDto)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'Ngoccanh',
        },
        email: {
          type: 'string',
          example: "ngoccanh@gmail.com",
        },
        emailconfirm: {
          type: 'string',
          example: "null",
        },
        firstname: {
          type: 'string',
          example: "Le",
        },
        lastname: {
          type: 'string',
          example: "Canh",
        },
        password: {
          type: 'string',
          example: "DBCFLebwfKWDBVKBWEBVJKbewjevwBJVW",
        },
        createat: {
          type: 'Date',
          example: "2023-09-19 11:01:42",
        },
        block: {
          type: 'string',
          example: "null",
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'create user successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})

  create(@Body() createUserDto: CreateUserDto) {
    console.log("vào create user");
    
    return this.usersService.create(createUserDto); 
  }


  @Get("confirmemail/:token")
  async confirm(@Param('token') token: string, @Res() res: Response) {
    // return this.usersService.confirmEmail(token);
    console.log("req.params",token);
    let confirmResult= await this.usersService.confirmEmail(token)
    const filePath = path.join('./../src/services/template/returnHomePage.ejs'); 
    console.log("filePath",filePath);
    res.render(filePath,{message:confirmResult.message})
  }


  @Get()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'Ngoccanh',
        },
        email: {
          type: 'string',
          example: "ngoccanh@gmail.com",
        },
        emailconfirm: {
          type: 'string',
          example: "null",
        },
        firstname: {
          type: 'string',
          example: "Le",
        },
        lastname: {
          type: 'string',
          example: "Canh",
        },
        password: {
          type: 'string',
          example: "DBCFLebwfKWDBVKBWEBVJKbewjevwBJVW",
        },
        createat: {
          type: 'Date',
          example: "2023-09-19 11:01:42",
        },
        block: {
          type: 'string',
          example: "null",
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Get user successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  findAll() {
    return this.usersService.comparepassword();
  }

  @Post("login")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'Ngoccanh',
        },
        password: {
          type: 'string',
          example: "DBCFLebwfKWDBVKBWEBVJKbewjevwBJVW",
        },

      },
    },
  })
  @ApiResponse({ status: 201, description: 'Login successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  login(@Body() loginUserDto:LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post("checktoken")
  checktoken(@Body() tokenUserDto:TokenUserDto) {
    return this.usersService.checktoken(tokenUserDto);
  }



  @Post('usergetchangeinfo')
  userGetChangeInfo(@Body() createChangeInfoUserDto: CreateChangeInfoUserDto) {
    return this.usersService.getChangeInfo(createChangeInfoUserDto)
  }

  @Post('userchangeinfo')
  userChangeInfo(@Body() updateUserDto:UpdateUserDto) {
    return this.usersService.changeInfo(updateUserDto)
  }

  @Post('userreconfirm')
  findOne(@Body() tokenUserDto:TokenUserDto) {
    return this.usersService.reConfirmEmail(tokenUserDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get("/123/1")
  findAll1(@Res() response: Response) {
    // Sửa đổi mã trạng thái thành 200
    response.status(203).json('OK');
  }
}
