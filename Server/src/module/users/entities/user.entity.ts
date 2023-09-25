import { Bag } from "src/module/bags/entities/bag.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import * as bcrypt from "bcrypt"
import { GateWay1 } from "src/module/gateway/entities/gateway.entity";
@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;


    @Column({ unique: true })
    username!: string 

    @Column({ unique: true })
    email!: string 

    @Column({
        nullable:true
    })
    emailconfirm!: string 

    @Column()
    firstname!: string 

    @Column()
    lastname!: string


    @Column()
    password: string;


    @BeforeInsert()
    async hashPassword() {
        this.password =await bcrypt.hash(this.password, 10);
    };
    

    
    @Column({
        nullable:true
    })
    avatar!: string

    @Column({
            nullable:true
        })
    createat!: Date

    @Column({
        nullable:true
    })
    block!: string

    // 1 user có nhiều túi
    @OneToMany(() => Bag, (bag) => bag.user)
    bags!: Bag[]

    //discord
    // 1 user có nhiều comment
    @OneToMany(() => GateWay1, (gate) => gate.user)
    gateway!: GateWay1[]
}
