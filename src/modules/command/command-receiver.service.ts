import { Injectable } from '@nestjs/common';
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

        var items = await this.cartRepository.query(`SELECT items->'items' as item from cart where id=${cartId}`);

        if(_cart.length > 0){
            if( _cart[0].customerId == order.client){
                items[0].item.map( async ({product, quantity}) => {

                    _product =  await this.productRepository.find({where: {id: product}});

                    count ++;

                    totalPrice += _product[0].price * quantity;

                    if(count == items[0].item.length){
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


    public async undo(){}

    public async findAll(){
        return await this.commandRepository.find();
    }

    public async findOneById(orderId : number){
        return await this.commandRepository.find({where : {id : orderId}});
    }

    public async delete(orderId : number){
        const orderExist = await this.commandRepository.find({where: {id: orderId}});
        if(orderExist.length != 0)
            return await this.commandRepository.delete(orderId);
    }

    public async update(orderId : number, order : any){
        const orderExist = await this.commandRepository.find({where: {id: orderId}});

        if(orderExist.length != 0)
            return await this.commandRepository.update(orderId, order);
    }
}
