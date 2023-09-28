import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';



//orm
import {  Inject } from '@nestjs/common';
import { In, Raw, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { QueryFailedError } from 'typeorm';
import { CreateAdminCheckLoginDto,  } from './dto/admin-checklogin.dto';
import { CreateAdminGetProductDto } from './dto/admin-getproduct.dto';
import jwt from 'src/services/jwt';
import { ProductImage } from '../productimages/entities/productimage.entity';
import { Category } from '../category/entities/category.entity';
import { CreateAdminDeleteProductDto } from './dto/admin-deleteproduct.dto';

//query
import { ILike } from "typeorm";



@Injectable()

export class ProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly  productRepository: Repository<Product>,
    
    @Inject('PRODUCTIMAGE_REPOSITORY')
    private readonly  productImageRepository: Repository<ProductImage>,

    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository:Repository<Category>,
  ) {}

  
  async create(createProductDto: CreateProductDto){
    try {
      //dữ liệu mẫu
    
      let data1:any={
        title:createProductDto.title,
        price:createProductDto.price,
        actualprice:createProductDto.actualprice,
        category:{id:createProductDto.categoryId},
        block:"null"
      }
    
      const categorys=await this.productRepository.save(data1);

      let data2:any={
        image:String(createProductDto.image),
        img1:String(createProductDto.img1),
        img2:String(createProductDto.img2),
        img3:String(createProductDto.img3), 
        img4:String(createProductDto.img4),
        products:{id:categorys.id}
      }

      const images=await this.productImageRepository.save(data2);
      
      return  {
        status: true,
        message: "Add Product success !",
        // data: users
              }

      
    } catch (error) {
        console.log("errr",error);
        return  {
          status: false,
          message: "Error Add Product !",
                }
    }
  }


  async findByPage(skip,take,sortby,search) {
    try{


      if(search){
        let findByPageResult=await this.productRepository?.find({skip,take});
        const categorys = await this.categoryRepository?.find({where:{sex:"men",block:"null"}});
        const categoryIds = categorys.map(category => category.id);
  
        const products1 = await this.productRepository?.find({
          skip,take, 
          where: {block:"null", 
                category: { id: In(categoryIds), 
                            block:"null" }, 
                title:ILike(`%${search}%`)
              },
          relations: ['productimage'],
          order: {
          price:sortby=="desc"?'DESC':'ASC'
          }
        });
        console.log("products1",products1);
        
        
        const [products, total] = await this.productRepository?.findAndCount(
          {
            skip,take, 
          where: {block:"null", 
                  category: { id: In(categoryIds), 
                              block:"null" }, 
                  title:ILike(`%${search}%`)
                },
          relations: ['productimage'],
          order: {
            price:sortby=="desc"?'DESC':'ASC'
          }
          }
        );
  console.log("total,total",total);
  
        return {
          status:true,
          message:"get product by page success",
          data:products1,
          total:total?total:1
        
        }
      }else{
        let findByPageResult=await this.productRepository?.find({skip,take});
        const categorys = await this.categoryRepository?.find({where:{sex:"men",block:"null"}});
        const categoryIds = categorys.map(category => category.id);
  
        const products1 = await this.productRepository?.find({skip,take, 
          where: {
            block:"null", 
            category: { id: In(categoryIds),block:"null" } },
          relations: ['productimage'],
          order: {
            price:sortby=="desc"?'DESC':'ASC'
          }
        });
        
        const [products, total] = await this.productRepository?.findAndCount({skip,take, where: {block:"null", category: { id: In(categoryIds),block:"null" } },relations: ['productimage'] });
  
        return {
          status:true,
          message:"get product by page success",
          data:products1,
          total:total
        
        }
      }



    }
    catch(err){
      console.log(err);
      
    return {
      status:false,
    message:"Lấy Danh Sách Product findByPage không thành công"
    }
    }

    // return this.productRepository.find();
  }

  async findAll() {
      try{
     
        const categorys = await this.categoryRepository?.find({where:{sex:"men",block:"null"}});
        const categoryIds = categorys.map(category => category.id);

        const products = await this.productRepository?.find({ where: {block:"null", category: { id: In(categoryIds),block:"null" } },relations: ['productimage'] });
       
        return  {
          status:true,
          message:"Lấy Danh Sách Product FindAll Thành công",
          data:products
        }
        

      }
      catch(err){
        return  {
          status:false,
          message:"Lấy Danh Sách Product FindAll Thất Bại"

        }
      }


    
  }

  async getProductByCategory(data){
    console.log("data?.sortby==desc",data?.sortby=="desc");
    console.log("data.search",data);
    
    
    try {
      if(data.search){
        console.log("vào if");
        console.log("data.search",data.search);
        
        
        const categorys = await this.categoryRepository.createQueryBuilder('category')
        .where('category.sex = :sex', { sex: 'men' })
        .where('category.block = :block', { block: 'null' })
        .where('category.name IN (:...names)', {names: data.listCategory })
        // .leftJoinAndSelect('category.products', 'product')
        .getMany();
  
        const categoryIds = categorys.map(category => category.id);
        const products1 = await this.productRepository?.find({
          skip:data.skip,
          take:data.take, 
          where: {  category: { id: In(categoryIds) },
                    block:"null" ,
                    title:ILike(`%${data.search}%`)
                  },
          relations: ['productimage'] ,
          order: {
            price:data?.sortby=="desc"?'DESC':'ASC'
          }
      });
        const [products, total] = await this.productRepository?.findAndCount({
          skip:data.skip,
          take:data.take, 
          where: {  category: { id: In(categoryIds) },
                    block:"null" ,
                    title:ILike(`%${data.search}%`)
                  },
          relations: ['productimage'] ,
          order: {
            price:data?.sortby=="desc"?'DESC':'ASC'
          }
      }
  
          
      
      );
  
        return {
          status: true,
          message: "Get Product by category success !",
          data: products1,
          total:total?total:1
          }
      }
      else{
        console.log("vào else");
        
        const categorys = await this.categoryRepository.createQueryBuilder('category')
        .where('category.sex = :sex', { sex: 'men' })
        .where('category.block = :block', { block: 'null' })
        .where('category.name IN (:...names)', {names: data.listCategory })
        // .leftJoinAndSelect('category.products', 'product')
        .getMany();
  
        const categoryIds = categorys.map(category => category.id);
        const products1 = await this.productRepository?.find({
          skip:Number(data.skip),
          take:Number(data.take), 
          where: {  category: { id: In(categoryIds) },
                    block:"null" ,
                  },
          relations: ['productimage'] ,
          order: {
            price:data?.sortby=="desc"?'DESC':'ASC'
          }
      });
        const [products, total] = await this.productRepository?.findAndCount({
          skip:data.skip,
          take:data.take, 
          where: {  category: { id: In(categoryIds) },
                    block:"null" 
                  },
          relations: ['productimage'] ,
          order: {
            price:data?.sortby=="desc"?'DESC':'ASC'
          }
      }
  
          
      
      );
  
        return {
          status: true,
          message: "Get Product by category success !",
          data: products1,
          total:total?total:1
          }
      }
     

      
    } catch (error) {
      return {
        status: false,
        message: "Error getting getProductByCategory !",
    }
    }
  }
  
  //phân trang
  async getProductByPage(skip,take) {
    // console.log("skip là",skip);
    // console.log("take là",take);
    try{
      const [products, total] = await this.productRepository?.findAndCount({
        skip,
        take,
      });
      
      console.log("total",total);
      

      return this.productRepository?.find({skip,take}); 
    }
    catch(err){
    return {
      status:false,
    message:"Lấy Danh Sách Product getProductByPage không thành công"
    }
    } 

    // return this.productRepository.find();
  }


  //admin
  adminCheckToken(createAdminCheckLoginDto: CreateAdminCheckLoginDto){
    try{
      let unpack:any= jwt.verifyToken(createAdminCheckLoginDto.token);
      console.log("unpack",unpack);
      
      if(unpack.username=="admin"){
       
        //enter code below this line
        console.log("Bạn Là Admin");
        return {
          status:true,
          message:"Bạn Là Admin"
        }

      }else{
        console.log("Bạn Không Phải Là Admin");
        return {
          status:false,
          message:"Bạn Không Phải Là Admin"
        }
      }
    }
    catch(err){
    console.log("Lỗi Hệ Thống");
    return {
      status:false,
      message:"Lỗi hệ thống"
    }
    
    }
  }

  async adminGetProduct(createAdminGetProductDto:CreateAdminGetProductDto){
    try {

      const categorys=await this.categoryRepository?.find({where:{sex:createAdminGetProductDto?.data?.type,block:"null"}});
      const categoryIds = categorys.map(category => category.id);

      const products = await this.productRepository?.find({ where: { category: { id: In(categoryIds) },block:"null" },relations: ['productimage'] });
      console.log(products);
     

      return {
        status: true,
        message: "Get Product success !",
        data: products
    }

      
    } catch (error) {
      console.log("errrrr",error);
      
      return { 
        status: false,
        message: "Error Get Product !",
    }
    }
  }

  async adminDeleteProduct(createAdminDeleteProductDto:CreateAdminDeleteProductDto){
      //giải mã token
      try{
        console.log("createAdminDeleteProductDto.id",createAdminDeleteProductDto);
        
        let unpack:any= jwt.verifyToken(createAdminDeleteProductDto.token);
        if(unpack){

          let deleteProductResult=await this.productRepository
                                      .createQueryBuilder()
                                      .update(Product)
                                      .set({ block: "true"})
                                      .where("id = :id", { id: createAdminDeleteProductDto.id })
                                      .execute()
          return {
            status: true,
            message: "Xoá sản phẩm thành công",
          }

        }
        return {
          status: false,
          message: "Chưa đăng nhập",
        }
      }
      catch(err){
        return {
          status: false,
          message: "Delete product thất bại !",
          // data: null
              }
      }
  
}

}

