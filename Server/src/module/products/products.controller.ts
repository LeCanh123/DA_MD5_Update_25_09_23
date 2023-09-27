import { Controller, Get, Post, Body, Patch, Param, Delete, Version, ParseIntPipe, Query, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateAdminCheckLoginDto } from './dto/admin-checklogin.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import * as path from 'path';
import * as fs from 'fs';
import { uploadFileToStorage } from 'src/meobase';
import { CreateAdminGetProductDto } from './dto/admin-getproduct.dto';
import { CreateAdminDeleteProductDto } from './dto/admin-deleteproduct.dto';



@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}




//user
  @Get("findall")
  async findAll() {
    try{
      let findAllResult=await this.productsService.findAll();
          return findAllResult
    }
    catch(err){
      return {
        status:false,
        message:"Lấy Danh Sách Product Thất bại"
      }
    }

   
  }
  @Post("findbypage")
  findByPage(@Body() data,@Query('skip', ParseIntPipe) skip: number, @Query('take', ParseIntPipe) take: number,) {
    try{
        if(take){
          return this.productsService.findByPage(skip,take,data.sortby,data.search);
        }
        else{
          return this.productsService.findAll();
        }
    }
    catch(err){
      return {
        status:false,
        message:"Lấy Danh Sách Product Thất bại"
      }
    }

   
  }

@Post("getproductbycategory")
getProductByCategory(@Body() data){
  return this.productsService.getProductByCategory(data)

}







  //Admin
  @Post("admin/checklogin")
  adminCheckLogin(@Body() createAdminCheckLoginDto: CreateAdminCheckLoginDto) {
    return this.productsService.adminCheckToken(createAdminCheckLoginDto);
  }

  @Post()
  // @UseInterceptors(FilesInterceptor('image'))
  // @UseInterceptors(FilesInterceptor('image'))
  async create(@Body() createProductDto: CreateProductDto,@UploadedFiles() image: Array<Express.Multer.File>) {
    try{
      const originalFileName = image[0].originalname;
      const fileExtension = path.extname(originalFileName); // Trích xuất đuôi tệp tin
      const uploadedFilePath = image[0].path;
      const newFilePath = uploadedFilePath + fileExtension; // Đường dẫn mới với đuôi tệp tin đúng
      fs.renameSync(uploadedFilePath, newFilePath); // Đổi tên tệp tin
      //upload
      let avatarProcess;
      if(image){
        avatarProcess = await uploadFileToStorage(image[0], "products", fs.readFileSync(newFilePath));
       }
      //xoá sau khi upload
      fs.unlinkSync(newFilePath);

      let createProductResult=await this.productsService.create({...createProductDto,image:avatarProcess});
      return createProductResult;
    }
    catch(err){
      return {
        status:false,
        message:"Tạo Product Thất bại"
      }
    }

    // return createProductDto.name

  }

  @Post("admin/getproduct")
  async adminGetProduct(@Body() createAdminGetProductDto:CreateAdminGetProductDto){
    let adminGetProductResult=await this.productsService.adminGetProduct(createAdminGetProductDto);
    return adminGetProductResult
  }


  @Post("admin/deleteproduct")
  async adminDeleteProduct(@Body() CreateAdminDeleteProductDto:CreateAdminDeleteProductDto){
    let adminDeleteProductResult=await this.productsService.adminDeleteProduct(CreateAdminDeleteProductDto);
    return adminDeleteProductResult
  }


}
