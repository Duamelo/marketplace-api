import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import item from "./dto/items.dto";

@Entity({name: 'cart'})
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "jsonb", nullable: true })
    @Reflect.metadata("design:type", Object) 
    items: item[];

    @Column()
    customerId: number;

    @Column()
    isValid: boolean;
}
export default Cart;