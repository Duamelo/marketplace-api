import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import Product from "../product/product.entity";

@Entity({name: 'category'})
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[];
}
export default Category;