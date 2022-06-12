import { Repository } from 'typeorm';
import CreateProductDto from './dto/create-product.dto';
import Product from './product.entity';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    create(product: CreateProductDto): Promise<{
        product: Product;
    }>;
<<<<<<< HEAD
    getProductById(productId: number): Promise<Product[]>;
=======
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
}
export default ProductService;
