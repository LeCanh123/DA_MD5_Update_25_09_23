import { Product } from "src/module/products/entities/product.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id!: number

    @Column()
    sex!: string 

    @Column({ unique: true })
    name!: string 

    @Column({
        nullable:true
    })
    block!: string 

    @OneToMany(() => Product, (product) => product.category)
    products!: Product[]


}


// import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
// import { Product } from "./product.entity" 

// @Entity()
// export class Category {
//     @PrimaryGeneratedColumn()
//     id!: number

//     @Column()
//     sex!: string 

//     @Column({ unique: true })
//     name!: string 

//     @Column({
//         nullable:true
//     })
//     block!: string 

//     @OneToMany(() => Product, (product) => product.category)
//     products!: Product[]

// }