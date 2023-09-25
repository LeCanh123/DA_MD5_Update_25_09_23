import { Product } from "src/module/products/entities/product.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class ProductImage {
    @PrimaryGeneratedColumn('uuid')
    id!: null

    @Column()
    image!: string 

    @Column()
    img1!: string 

    @Column()
    img2!: string 

    @Column()
    img3!: string 

    @Column()
    img4!: string 

    @Column({
        nullable:true
    })
    block!: string 

    @ManyToOne(() => Product, (product) => product.productimage)
    products!: Product
}
