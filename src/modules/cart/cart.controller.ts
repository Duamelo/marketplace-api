import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import { CartService } from './cart.service';
import CreateCartDto from './dto/create-cart.dto';

@Controller('carts')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ){}

    @HttpCode (200)
    @UseGuards(JwtAuthenticationGuard)
    @Post()
    async addCart(@Body() cart: CreateCartDto, @Request() req){
        return await this.cartService.create(cart, req.user.id);
    }
}
