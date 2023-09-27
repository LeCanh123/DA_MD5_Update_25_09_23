import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import jwt from 'src/services/jwt';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}



  async userGetCategory(){
    try {
     
      const categorys = await this.categoryRepository.find({where:{block:"null"}});
      //nếu không có category
      if(categorys.length==0){
        return {
          status:false,
          message:"Không có category",
          data:{}
        }
      //nếu có category
      }else{
        const result:any = {};
        for (const item of categorys) {
          const { sex, id, name } = item;
          if (!(sex in result)) {
            result[sex] = [];
          }
          result[sex].push({ id, name });
        }
        return {
          status:true,
          message:"getcategory thành công",
          data:result
        }
      }
    } catch (err:any) {
      return {
        status: false,
        messsage: "Error productGetcategory !",
        data:{},
    }
    }

  }


  //admin
 async create(createCategoryDto: CreateCategoryDto) {
    try {
      let categoryData={
        name:createCategoryDto.category.name,
        sex:createCategoryDto.category.sex,
        block:"null"
      }
   
      const categorys=await this.categoryRepository.save(categoryData);
      
      return {
        status: true,
        message: "Add Category success !",
        // data: users
      }

      
    } catch (err:any) {
      if (err.toString().includes("Duplicate") ) {
        return {
          status: false,
          message: "Trùng category ",
      }
      }
      return {
        status: false,
        message: "Lỗi hệ thống ",
    }
    }
  }

  async findAll(token:string) {
    try{
      let unpack:any= jwt.verifyToken(token);
      if(unpack.username=="admin"){
        const categorys = await this.categoryRepository.find({where:{block:"null"}});
        return {
          status: true,
          message: "Get Category success !",
          data: categorys
        }
      
      }else{
        
        return {
          status:false,
          message:"Bạn Không Phải Là Admin"
        }
      }
    }
    catch(err){
    console.log("err findAll category");
      return {
        status:false,
        message:"Lỗi hệ thống"
      }
    
    }
  } 

  async deleteCategory(data) {
    try {
      let findCategory=await this.categoryRepository.find({where:{id:data.id}});
      if(findCategory.length==0){
        let findCategory1=await this.categoryRepository.find({where:{block:"null"}});
        if(findCategory1.length==0){
          return {
            status: false,
            messsage: "Error delete Category !",
                }
        }else{
          let updateCategory=await this.categoryRepository
          .createQueryBuilder()
          .update(Category)
          .set({ block: "true"})
          .where("id = :id", { id: findCategory1[0].id })
          .execute()
          return {
            status: true,
            messsage: "Delete Category success !",
            data: "null"
          }
        }

      }
      let updateCategory=await this.categoryRepository
          .createQueryBuilder()
          .update(Category)
          .set({ block: "true"})
          .where("id = :id", { id: data.id })
          .execute()
      return {
        status: true,
        messsage: "Delete Category success !",
        data: "null"
      }

      
    } catch (err:any) {
     
      return {
        status: false,
        messsage: "Error delete Category !",
            }
    }
  }

  async productGetcategory(data) {  
    try {
      const categorys = await this.categoryRepository.find({where:{block:"null"}});
      //nếu không có category
      if(categorys.length==0){
        return {
          status:false,
          message:"Không có category",
          data:{}
        }
      //nếu có category
      }else{
        const result:any = {};
        for (const item of categorys) {
          const { sex, id, name } = item;
          if (!(sex in result)) {
            result[sex] = [];
          }
          result[sex].push({ id, name });
        }
        return {
          status:true,
          message:"productGetcategory thành công",
          data:result
        }
      }
    } catch (err:any) {
     
      return {
        status: false,
        messsage: "Error productGetcategory !",
        data:{},
    }
    }
  }
}
