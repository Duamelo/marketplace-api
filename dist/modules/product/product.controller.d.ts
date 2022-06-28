import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import ProductService from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    addProduct(product: CreateProductDto): Promise<{
        product: import("./product.entity").Product;
    }>;
    getProductById(productId: number): Promise<import("./product.entity").Product[]>;
    deleteProduct(id: number): Promise<import("typeorm").DeleteResult>;
    getAllProduct(): Promise<import("./product.entity").Product[]>;
    updatePost(id: number, post: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
}
