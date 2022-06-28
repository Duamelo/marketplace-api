import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import CategoryService from './category.service';
import CategoryDto from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){}

    @HttpCode (200)
    @UseGuards(JwtAuthenticationGuard)
    @Post('create')
    async create(@Body() category: CategoryDto){
        return await this.categoryService.create(category);
    }

    @HttpCode (200)
    @UseGuards(JwtAuthenticationGuard)
    @Get('all')
    async getAllCategories(){
        return await this.categoryService.findAll();
    }

    @HttpCode (200)
    @UseGuards(JwtAuthenticationGuard)
    @Delete('id')
    async delete(@Param() id : number){
        return await this.categoryService.delete(id);
    }

    @HttpCode (200)
    @UseGuards(JwtAuthenticationGuard)
    @Put('id')
    async update( @Param() id : number ,@Body() category: CategoryDto){
        return await this.categoryService.update(id, category);
    }

    @HttpCode (200)
    @UseGuards(JwtAuthenticationGuard)
    @Get('id')
    async getCategoryById(@Param() id: number){
        return await this.categoryService.findOneById(id);
    }

    @HttpCode (200)
    @UseGuards(JwtAuthenticationGuard)
    @Get('name')
    async getCategoryByName(@Param() name: number){
        return await this.categoryService.findOneByName(name);
    }
}
