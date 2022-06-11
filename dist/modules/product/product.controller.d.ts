import CreateProductDto from './dto/create-product.dto';
import ProductService from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    addProduct(product: CreateProductDto): Promise<{
        product: import("./product.entity").Product;
    }>;
<<<<<<< HEAD
    getProductById(productId: number): Promise<import("./product.entity").Product[]>;
=======
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
}
