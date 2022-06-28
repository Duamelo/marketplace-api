import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
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
    async getProductById(@Param() productId : number){
        return await this.productService.findOneById(productId);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Delete(':id')
    async deleteProduct(@Param() id : number){
        return await this.productService.delete(id);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get(':all')
    async getAllProduct(){
        return await this.productService.findAll();
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Patch(':id')
    async updatePost(@Param() id : number, @Body() post: UpdateProductDto) {
        return await this.productService.update(id, post);
    }


}
