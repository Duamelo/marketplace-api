import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import CreateShopDto from './dto/create-shop.dto';
import { ShopService } from './shop.service';

@Controller('shops')
export class ShopController {
    constructor(
        private readonly shopService: ShopService
    ){}

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async add(@Body() shop: CreateShopDto, @Request() req){
        return await this.shopService.create(shop, req.user.id);
    }

/* not working*/
    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get('/:shopId/products')
    async getProductsByShop(@Param('shopId', ParseIntPipe) shopId : number){
        return await this.shopService.findProductsByShop(shopId);
    }



    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get()
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

