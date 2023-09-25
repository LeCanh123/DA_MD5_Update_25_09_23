import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}





//user
@Post("usergetcategory")
async userGetCategory(@Body() token) {
  console.log("vào get all category",token);
  
  let getCategoryResult=await this.categoryService.userGetCategory();
  return getCategoryResult
}








  //admin
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log("vào Controller('category')");
    
    let createCategoryResult= await this.categoryService.create(createCategoryDto);
    console.log(createCategoryResult);
    return createCategoryResult;
    
  }

  @Post("getall")
  async findAll(@Body() token) {
    console.log("vào get all category",token);
    
    let findCategoryResult=await this.categoryService.findAll(token.token);
    return findCategoryResult
  }

  @Post("delete")
  async delete(@Body() data) {

    let deleteCategoryResult=await this.categoryService.deleteCategory(data);
    return deleteCategoryResult

  }

  @Post("productgetcategory")
  async productGetcategory(@Body() data) {  
    let productGetCategoryResult=await this.categoryService.productGetcategory(data);
    return productGetCategoryResult

  }

}
