import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import CreateProductDto from './dto/create-product.dto';
import ProductService from './product.service';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async addProduct(@Body() product: CreateProductDto){
        return await this.productService.create(product);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get(':productId')
    async getProductById(@Param('productId', ParseIntPipe) productId: number){
        return await this.productService.getProductById(productId);
    }
}
