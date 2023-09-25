import { Address } from "src/module/address/entities/address.entity"
import { Cart } from "src/module/carts/entities/cart.entity"
import { User } from "src/module/users/entities/user.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bag {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    // @Column()
    // userId!: string

    @Column({
        nullable:true
    })
    block!: string
    
    //nhiều túi 1 user
    @ManyToOne(() => User, (user) => user.bags)
    user!: User

    // 1 túi nhiều cart
    @OneToMany(() => Cart, (cart) => cart.bag)
    carts!: Cart[]

    // 1 túi nhiều address
    @OneToMany(() => Address, (address) => address.bag)
    address!: Address[]
}
