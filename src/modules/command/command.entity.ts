import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Cart from "../cart/cart.entity";

@Entity({name: 'command'})
export class Command {

    @PrimaryGeneratedColumn()
    id: number;


    
    @OneToOne (() => Cart)
    @JoinColumn()
    orderItems : Cart;

    @Column()
    state :  string;

    @Column()
    status :  string;


    @Column()
    shippingAddress: string;

    @Column()
    totalPriceWithPrice : number;
}
export default Command;