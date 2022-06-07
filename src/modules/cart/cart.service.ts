import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Cart from './cart.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ){}

    async create(items : any, clientId : number){

        const newCart = await this.cartRepository.create({
            items: items,
            customerId: clientId,
            isValid: true
        });

        const _cart = await this.cartRepository.save(newCart);

        return {cart: _cart};
    }
}
