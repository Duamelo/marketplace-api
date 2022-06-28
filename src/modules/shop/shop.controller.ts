import { Body, Controller, Get, HttpCode, Param, Post, Request, UseGuards } from '@nestjs/common';
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



    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get('all')
    async getAllShops(){
        return await this.shopService.findAll();
    }


    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get(':name')
    async getShopByName(@Param() name : string, @Request() req){
        return await this.shopService.findOneByName(name, req.user.id);
    }
}

