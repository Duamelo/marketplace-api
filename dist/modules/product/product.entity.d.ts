import Category from "../category/category.entity";
import ImageHandler from "../images-handler/imageHandler.entity";
import Shop from "../shop/shop.entity";
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: string;
    reference: string;
    categories: Category[];
    shop: Shop;
    images: ImageHandler[];
}
export default Product;
