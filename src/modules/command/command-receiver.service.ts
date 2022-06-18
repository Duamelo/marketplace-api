import { Injectable, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Cart from '../cart/cart.entity';
import Product from '../product/product.entity';
import Command from './command.entity';
import OrderCommandDto from './dto/orderCommand.dto';

/**
 * Command receiver class
 */

@Injectable()
export class CommandReceiver {

    constructor(
        @InjectRepository(Command)
        private readonly commandRepository: Repository<Command>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Cart)
        private readonly cartRepository : Repository<Cart>
    ){}

    public async execute(order: OrderCommandDto){

        var _product;
        var count = 0, totalPrice = 0;
        const  cartId  = order.order.cartId;

        var _cart = await this.cartRepository.find({where: {id: cartId}});

        console.log("cart");
        console.log(_cart);
        console.log(Object.keys(_cart[0].items));

        var items = await this.cartRepository.query(`SELECT items->'items' as item from cart where id=${cartId}`);
        console.log(items[0].item);

        if(_cart.length > 0){
            if( _cart[0].customerId == order.client){
                console.log(items[0].item.length);
                items[0].item.map( async ({product, quantity}) => {

                    _product =  await this.productRepository.find({where: {id: product}});

                    count ++;

                    totalPrice += _product[0].price * quantity;

                    if(count == items[0].item.length){
                        console.log("count match");
                        const newOrder = await this.commandRepository.create({
                            orderItems: _cart[0],
                            state: "none",
                            status: "none",
                            shippingAddress: order.order.shippingAddress,
                            totalPriceWithPrice: totalPrice
                        });
                        const _order = await this.commandRepository.save(newOrder);
            
                        return {order: _order};
                    }
                });
            }
        }

     
    }


    public undo(){

    }
}
