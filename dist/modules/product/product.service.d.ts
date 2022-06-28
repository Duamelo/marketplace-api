import { Repository } from 'typeorm';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import Product from './product.entity';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    create(product: CreateProductDto): Promise<{
        product: Product;
    }>;
    findOneById(productId: number): Promise<Product[]>;
    findAll(): Promise<Product[]>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    update(productId: number, product: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
}
export default ProductService;
