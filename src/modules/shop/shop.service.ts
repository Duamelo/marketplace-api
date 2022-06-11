import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateShopDto from './dto/create-shop.dto';
import ShopDto from './dto/shop.dto';
import Shop from './shop.entity';


@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>
    ){}

    async create(shop: CreateShopDto, vendorId: any){
        var shopExist = await this.shopRepository.find({where: {name: shop.name}});

        if(shopExist.length > 0)
            return "this name shop already exist. Please give another name to your shop";
        
        const rest : ShopDto = shop;

        const newShop = await this.shopRepository.create({
            ...rest,
            vendor: {
                id: vendorId
            }
        });

        const _shop = await this.shopRepository.save(newShop);

        return {shop: _shop};
    }
}
