import { Bag } from "src/module/bags/entities/bag.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id!: number

    @Column()
    name!: string 

    @Column()
    building!: string 


    @Column()
    city!: string 

    @Column()
    mobile!: string 

    @Column()
    pin!: string 

    @Column()
    state!: string 

    //nhiều address 1 bag
    @ManyToOne(() => Bag, (bag) => bag.address)
    bag!: Bag
}
