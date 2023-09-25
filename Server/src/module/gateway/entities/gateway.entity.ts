import { User } from "src/module/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum Chattype{
    ADMIN="ADMIN",
    USER="USER"
}

@Entity()
export class GateWay1 {
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column({type:"enum",enum:Chattype})
    type: Chattype 

    @Column()
    adminId: string 


    @Column()
    time: string 

    @Column()
    content: string 

    @Column()
    textChanelDiscord: string 


    // @Column()
    // actualprice!: number 

    // @Column({ 
    //     nullable:true
    // })
    // block!: string 


    @ManyToOne(() => User, (user) => user.gateway)
    user!: User

  


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
