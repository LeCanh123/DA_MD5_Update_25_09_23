import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RemoveCartDto } from './dto/remove-cart.dto';
import { GetCartDto } from './dto/get-cart.dto';
import { ChageQuantityCartDto } from './dto/changequantity-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post("add")
  create(@Body() createCartDto: CreateCartDto) {
    
    
    return this.cartsService.add(createCartDto);
  }

  @Post("remove")
  async remove(@Body() removeCartDto: RemoveCartDto) {
    let removeResult= await this.cartsService.remove(removeCartDto);
    console.log("removeResult",removeResult);
    
     return removeResult
  }

  @Post("get")
  getcart(@Body() getCartDto: GetCartDto) {
    return this.cartsService.get(getCartDto);
  }

  @Post("changequantity")
  changequantity(@Body() chageQuantityCartDto: ChageQuantityCartDto) {
    return this.cartsService.changeQuantity(chageQuantityCartDto);
  }


}
