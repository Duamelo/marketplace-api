import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import Product from "../product/product.entity"
import Vendor from "../vendor/vendor.entity"

@Entity({name: 'shop'})
export class Shop {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string


    @Column()
    location: string

    @OneToMany(() => Product, (product) => product.shop)
    products: Product[];

    @ManyToOne(() => Vendor, (vendor) => vendor.shops)
    vendor: Vendor
}
export default Shop;