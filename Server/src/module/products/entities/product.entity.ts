import { Category } from 'src/module/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProductImage } from 'src/module/productimages/entities/productimage.entity';
import { Cart } from 'src/module/carts/entities/cart.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    title!: string 

    @Column()
    price!: number 

    @Column()
    actualprice!: number 

    @Column({
        nullable:true
    })
    block!: string 


    @ManyToOne(() => Category, (category) => category.products)
    category!: Category

    @OneToMany(() => ProductImage, (productimage) => productimage.products)
    productimage!: ProductImage[]

    @OneToMany(() => Cart, (cart) => cart.products)
    carts!: Cart[]


}



// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,OneToMany, JoinColumn } from "typeorm"
// import { Category } from "./category.entity" 
// import { ProductImage } from "./productimage.entity"
// import { Cart } from "./cart.entity"
// @Entity()
// export class Product {
//     @PrimaryGeneratedColumn()
//     id!: number

//     @Column()
//     title!: string 

//     @Column()
//     price!: number 

//     @Column()
//     actualprice!: number 

//     @Column({
//         nullable:true
//     })
//     block!: string 

//     @ManyToOne(() => Category, (category) => category.products)
//     category!: Category

//     @OneToMany(() => ProductImage, (productimage) => productimage.products)
//     productimage!: ProductImage[]

//     @OneToMany(() => Cart, (cart) => cart.products)
//     carts!: Cart[]
// }
