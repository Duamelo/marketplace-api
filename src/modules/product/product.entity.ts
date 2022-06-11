import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from "typeorm";
import Category from "../category/category.entity";
import ImageHandler from "../images-handler/imageHandler.entity";
import Shop from "../shop/shop.entity";

@Entity({name: 'product'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    reference: string;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Shop, (shop) => shop.products)
    shop: Shop;

    @OneToMany(() => ImageHandler, (image) => image.product)
    images: ImageHandler[];
}
export default Product;