import { Bag } from "src/module/bags/entities/bag.entity"
import { Product } from "src/module/products/entities/product.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id!: number

    // @Column()
    // productId!: number 

    @Column()
    quantity!: number 

    @Column({
        nullable:true
    })
    block!: string
    
    //nhiều cart 1 túi
    @ManyToOne(() => Bag, (bag) => bag.carts)
    bag: Bag

    //nhiều cart 1 product
    @ManyToOne(() => Product, (product) => product.carts)
    products!: Product
}
