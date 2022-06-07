import { Repository } from 'typeorm';
import CreateProductDto from './dto/create-product.dto';
import Product from './product.entity';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    create(product: CreateProductDto): Promise<{
        product: Product;
    }>;
}
export default ProductService;
