import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import CreateShopDto from './dto/create-shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService
    ){}

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Post('create')
    async create(@Body() shop: CreateShopDto, @Request() req){
        return await this.shopService.create(shop, req.user.id);
    }
}

