import { Inject, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Repository } from 'typeorm';
import { Address } from '../address/entities/address.entity';
import jwt from 'src/services/jwt';
import { Cart } from '../carts/entities/cart.entity';
import { User } from 'discord.js';
import { Bag } from '../bags/entities/bag.entity';
import { GetPurchaseDto } from './dto/get-purchase.dto';

@Injectable()
export class PurchaseService {

  constructor(
    @Inject('PURCHASE_REPOSITORY')
    private addressRepository: Repository<Address>,

    @Inject('CART_REPOSITORY')
    private cartRepository: Repository<Cart>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,

    @Inject('BAG_REPOSITORY')
    private bagRepository: Repository<Bag>,
  ) {}

async addOrder(createPurchaseDto: CreatePurchaseDto){
  try{
    let unpack:any= jwt.verifyToken(createPurchaseDto.token);
    if(unpack){

      //tìm thông tin user

      // let findUserInfo=await this.userRepository.find({where:{username:unpack.username}});

      //tìm giỏ hàng
      let findUserBag:any=await this.bagRepository.find({where:{user:{id:unpack.id},block:"null"}});
      //nếu không thấy giỏ hàng
      if(findUserBag.length==0){
        //trả về lỗi
        return {
            status: false,
            message: "Giỏ hàng không tồn tại",
          }
      //nếu thấy giỏ hàng
      }else{
        //thêm địa chỉ vào giỏ hàng
        let addOrderResult=await this.addressRepository.save({...createPurchaseDto.data,bag:{id:findUserBag[0].id}});

        //block giỏ hàng
        // let blockUserBag=userBag;
        let blockUserBag=await this.bagRepository
            .createQueryBuilder()
            .update(Bag)
            .set({ block: "true"})
            .where("id = :id", { id: findUserBag[0].id })
            .execute();

        return {
            status: true,
            message: "Tạo đơn hàng thành công",
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
      message: "add Order thất bại !",
      // data: null
          }
  }
}

async getHistory(getPurchaseDto:GetPurchaseDto){
  try{
    let unpack:any= jwt.verifyToken(getPurchaseDto.token);
    if(unpack){
 
      //tìm thông tin user
      // let findUserChangeInfo=await this.userRepository.find({where:{username:unpack.username}});

      //tìm giỏ hàng

      let findUserBag:any=await this.bagRepository.find({where:{user:{id:unpack.id},block:"true"},relations: ['carts','carts.products','carts.products.productimage']});
      //nếu không thấy giỏ hàng
      if(findUserBag.length==0){
        //trả về lỗi
        return {
            status: false,
            message: "Chưa có đơn hàng",
          }
      //nếu thấy giỏ hàng
      }else{
        return {
            status: true,
            data:findUserBag,
            message: "Lấy danh sách đơn hàng thành công",
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
      message: "Lấy đơn hàng thất bại !",
      // data: null
          }
  }
}


  create(createPurchaseDto: CreatePurchaseDto) {
    return 'This action adds a new purchase';
  }

  findAll() {
    return `This action returns all purchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
