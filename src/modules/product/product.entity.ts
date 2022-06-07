import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import Category from "../category/category.entity"
import Shop from "../shop/shop.entity"

@Entity({name: 'product'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    images: string

    @Column()
    price: string

    @Column()
    reference: string


    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Shop, (shop) => shop.products)
    shop: Shop;
}
export default Product;