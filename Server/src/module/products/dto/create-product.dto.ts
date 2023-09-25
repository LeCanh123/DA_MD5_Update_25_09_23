import { IsNotEmpty, IsString } from "class-validator"

export class CreateProductDto {
    // id:string
    readonly  title:string
    readonly  price:number
    readonly   actualprice:number
    readonly   block:string
    readonly   image:string
    readonly   img1:string
    readonly    img2:string
    readonly    img3:string
    readonly    img4:string
    // @IsNotEmpty()
    readonly categoryId:{id:string}
}


