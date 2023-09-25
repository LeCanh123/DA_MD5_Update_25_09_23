import { Inject, Injectable } from '@nestjs/common';
import { CreateCartDto,  } from './dto/create-cart.dto';
import { RemoveCartDto } from './dto/remove-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Bag } from '../bags/entities/bag.entity';
import { User } from '../users/entities/user.entity';
import jwt from 'src/services/jwt';
import { GetCartDto } from './dto/get-cart.dto';
import { ChageQuantityCartDto } from './dto/changequantity-cart.dto';


@Injectable()
export class CartsService {
  constructor(
    @Inject('CART_REPOSITORY')
    private cartRepository: Repository<Cart>,

    @Inject('BAG_REPOSITORY')
    private bagRepository: Repository<Bag>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,


  ) {}

//thêm sp vào giỏ
  async add(createCartDto: CreateCartDto) {
    console.log("createCartDto",createCartDto);
    
    try{
      let unpack:any= jwt.verifyToken(createCartDto.token);
      if(unpack){
       
        //tìm thông tin user
        let findUser1=await this.userRepository.find({where:{username:unpack.username}});
        //thêm sản phẩm vào giỏ hàng
        //tìm giỏ hàng
        let findUserBag=await this.bagRepository.find({where:{user:{id:unpack.id},block:"null"}});
        //nếu không thấy giỏ hàng
        //tạo giỏ hàng
        if(findUserBag.length==0){
          let createUserBag=await this.bagRepository.save({block:"null",user:{id:findUser1[0]?.id!}});
          //thêm hàng vào giỏ vừa tạo
          let addUserCart=await this.cartRepository.save({block:"null",bag:{id:createUserBag?.id!},quantity:1,products:createCartDto.id});
          return {
            status: true,
            message: "Thêm sản phẩm thành công",
          }
        //nếu thấy giỏ hàng
        }else{
        //tìm sản phẩm trong giỏ hàng
        let findUserCart=await this.cartRepository.find({where:{block:"null",bag:{id:findUserBag[0].id},products:{id:createCartDto.id}}});
            //nếu sản phẩm chưa có trong giỏ hàng
            if(findUserCart.length==0){
                //thêm hàng vào giỏ vừa tìm
                let addUserCart=await this.cartRepository.save({block:"null",bag:{id:findUserBag[0].id!},quantity:1,products:createCartDto.id});
                return { 
                  status: true,
                  message: "Add Product success !",
                  // data: null
                      }
            }
             //nếu sản phẩm đã có trong giỏ hàng
            else{
                //update hàng trong giỏ vừa tìm
                let addUserCart=await this.cartRepository
                                      .createQueryBuilder()
                                      .update(Cart)
                                      .set({ quantity:(findUserCart[0].quantity+1)})
                                      .where("id = :id", { id: findUserCart[0].id })
                                      .execute()
                
                return {
                  status: true,
                  message: "Add Product success !",
                  // data: null
                      }
            }
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
        message: "Add Product thất bại !",
        // data: null
            }
    }
  }


//xoá sp khỏi giỏ
 async remove(removeCartDto: RemoveCartDto) {
    try{
      let unpack:any= jwt.verifyToken(removeCartDto.token);
      if(unpack){
        //lấy sản phẩm trong giỏ
        //tìm giỏ hàng
console.log("unpack.id",unpack.id);

        let findUserBag:any=await this.bagRepository.find({where:{user:{id:unpack.id},block:"null"}});
          //nếu không tìm thấy giỏ
          if(findUserBag.length==0){
            return {
              status:false,
              message:"Sản Phẩm không tồn tại",
              data:[]
            }
          }
          //nếu tìm thấy giỏ
          else{
            //tìm sản phẩm trong giỏ
       
            // let findProductInCart=await userCartRepository.find({where:{products:{id:data.id}}});
            let findProductInCart=await this.cartRepository.find({where:{id:removeCartDto.id}});
             //nếu không tìm thấy trong giỏ
             if(findProductInCart.length==0){
                return {
                  status:false,
                  message:"Sản Phẩm không tồn tại",
                  data:[]
                }
             }                                               
             //nếu tìm thấy sản phẩm trong giỏ
              //xoá sản phẩm trong giỏ
              let deleteProduct= await this.cartRepository
              .createQueryBuilder('users')
              .delete()
              .from(Cart)
              .where("id = :id", { id: findProductInCart[0].id })
              .execute()

              return {
                status:true,
                message:"Xoá sản phẩm thành công",
              }       

          }

      }
      return  {
        status:false,
        message:"Chưa đăng nhập",
              }
    }
    catch(err){
      console.log("errrrr",err);
      
      return {
        status:false,
        message:"Lỗi hệ thống",
      }
    }
  }


// lấy danh sách sp trong giỏ
async get(getCartDto: GetCartDto) {
  try{
    let unpack:any= jwt.verifyToken(getCartDto.token);
    if(unpack){
      //lấy sản phẩm trong giỏ
      //tìm giỏ hàng
      let findUserBag:any=await this.bagRepository.find({where:{user:{id:unpack.id},block:"null"}});
        //nếu không tìm thấy giỏ
        if(findUserBag.length==0){
          return {
            status:false,
            message:"Chưa Có Sản Phẩm trong giỏ",
            data:[]
          }
        }
        //nếu tìm thấy giỏ
        else{
          //tìm sản phẩm trong giỏ
          let findUserCart=await this.cartRepository.find({where:{bag:{id:findUserBag[0].id}},
                                                          relations: ['products','products.productimage']
                                                      });
          return {
            status:true,
            message:"Lấy giỏ hàng thành công",
            data:findUserCart
          }       

        }

    }
    return {
      status:false,
      message:"Lấy giỏ hàng không thành công",
      data:[]
    }
  }
  catch(err){
    return {
      status:false,
      message:"Lỗi hệ thống",
      data:[]
    }

  }


}


async changeQuantity(chageQuantityCartDto:ChageQuantityCartDto){
  try{
    let unpack:any= jwt.verifyToken(chageQuantityCartDto.token);
    if(unpack){
      //lấy sản phẩm trong giỏ
      //tìm giỏ hàng
      let findUserBag:any=await this.bagRepository.find({where:{user:{id:unpack.id},block:"null"}});
        //nếu không tìm thấy giỏ
        if(findUserBag.length==0){
          return {
            status:false,
            message:"Giỏ hàng không tồn tại",
          }
        }
        //nếu tìm thấy giỏ
        else{
          //tìm sản phẩm trong giỏ

          // let findProductInCart=await userCartRepository.find({where:{products:{id:data.id}}});
          let findProductInCart=await this.cartRepository.find({where:{products:{id:chageQuantityCartDto.id},bag:{id:findUserBag[0]?.id}}});
           //nếu không tìm thấy trong giỏ
           if(findProductInCart.length==0){
              return {
                status:false,
                message:"Sản Phẩm không tồn tại",
              }
           }                                               
           //nếu tìm thấy sản phẩm trong giỏ
            //xoá sản phẩm trong giỏ
            let changeQuantity= await this.cartRepository
              .createQueryBuilder()
              .update(Cart)
              .set({ quantity:chageQuantityCartDto.type=="increase"?findProductInCart[0].quantity+1:findProductInCart[0].quantity-1 })
              .where("id = :id", { id: findProductInCart[0].id })
              .execute()

            return {
              status:true,
              message:chageQuantityCartDto.type=="increase"?"Tăng số lượng thành công":"Giảm số lượng thành công",
            }       

        }

    }
    return  {
      status:false,
      message:"Chưa đăng nhập",
            }
  }
  catch(err){
    return {
      status:false,
      message:"Lỗi hệ thống",
    }
  }
}

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }


}
