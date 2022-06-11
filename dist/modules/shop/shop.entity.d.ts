import Product from "../product/product.entity";
import Vendor from "../vendor/vendor.entity";
export declare class Shop {
    id: number;
    name: string;
    description: string;
    location: string;
    products: Product[];
    vendor: Vendor;
}
export default Shop;
