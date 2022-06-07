import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
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
}
