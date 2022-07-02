import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Category from '../category/category.entity';
import CreateProductDto from './dto/create-product.dto';
import ProductDto from './dto/product.dto';
import UpdateProductDto from './dto/update-product.dto';
import Product from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>
    ){}

    async create(product: CreateProductDto){

            const id = product.shopId;
            var _categories = [];

            for(var i = 0; i < product.categories.length; i++){
                var catExist = await this.categoriesRepository.find({where : { name : product.categories[i]}});
                if(catExist.length != 0)
                    _categories.push(catExist[0]);
            }
            const rest: ProductDto = product;

            const newProduct = await this.productRepository.create({
                ...rest,
                shop: {
                    id
                },
                categories: _categories
            });

            const _product = await this.productRepository.save(newProduct);

            return {product: _product};
    }

    async findOneById(productId: number){
        return await this.productRepository.find({ where: 
            {
                id: productId,
            },
            relations :{
                images: true,
                categories: true,
                shop: true
            }
        })
    }

    async findOneByIdAndShop(productId: number, shopId: number){
        return await this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.shop", "shop")
            .where("product.id = :productId", {productId: productId})
            .andWhere("shop.id = :shopId", {shopId: shopId})
            .getOne();
    }

    async findAll(){
        return await this.productRepository.find({
            relations : {
                 shop : true, 
                 categories : true, 
                 images : true
            }
        });
    }

    async delete(id: number){
        const productExist = await this.productRepository.find({where : {id: id}});

        if(productExist.length != 0)
            return await this.productRepository.delete(id);
    }


    async update(productId : number, product : UpdateProductDto){
        const productExist = await this.productRepository.find({where: {id: productId}});

        if(productExist)
            return await this.productRepository.update(productId, product);
    }
}
export default ProductService;