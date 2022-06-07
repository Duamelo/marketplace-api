import Category from "../category/category.entity";
import Shop from "../shop/shop.entity";
export declare class Product {
    id: number;
    name: string;
    description: string;
    images: string;
    price: string;
    reference: string;
    categories: Category[];
    shop: Shop;
}
export default Product;
