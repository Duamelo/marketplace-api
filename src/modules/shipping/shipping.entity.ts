import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
// import Product from "../product/product.entity"
// import Vendor from "../vendor/vendor.entity"

@Entity({name: 'shipping'})
export class Shipping {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    price: number


    @Column()
    priceWithTaxe: number

    // @OneToMany(() => Product, (product) => product.shop)
    // products: Product[];

    // @ManyToOne(() => Vendor, (vendor) => vendor.shops)
    // vendor: Vendor
}
export default Shipping;