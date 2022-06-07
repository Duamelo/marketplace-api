import CreateProductDto from './dto/create-product.dto';
import ProductService from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    addProduct(product: CreateProductDto): Promise<{
        product: import("./product.entity").Product;
    }>;
}
