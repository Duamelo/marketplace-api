import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import CreateProductDto from './dto/create-product.dto';
import ProductService from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Post('add')
    async addProduct(@Body() product: CreateProductDto){
        return await this.productService.create(product);
    }
}
