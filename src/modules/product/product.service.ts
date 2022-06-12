import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateProductDto from './dto/create-product.dto';
import ProductDto from './dto/product.dto';
import Product from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}

    async create(product: CreateProductDto){

            const id = product.shopId;
            // const name = product.productName;

            const rest: ProductDto = product;

            const newProduct = await this.productRepository.create({
                ...rest,
                shop: {
                    id
                }
            });

            const _product = await this.productRepository.save(newProduct);

            return {product: _product};
    }

    async getProductById(productId: number){
        return await this.productRepository.find({ where: 
            {
                id: productId,
            },
            relations :{
                images: true,
                categories: true
            }
        })
    }
}
export default ProductService;
