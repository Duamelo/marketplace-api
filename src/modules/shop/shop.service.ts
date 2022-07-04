import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
            throw new HttpException("this name shop already exist. Please give another name to your shop", HttpStatus.NOT_FOUND);
            
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


    async findAll(){
        return await this.shopRepository.find({
            relations : {
                products : true,
                vendor : true
            }
        });
    }

    async findOneByName(name : string, vendorId : number){
        const shopExist = await this.shopRepository.find({
            where : {
                name : name, 
                vendor : {
                    id: vendorId
                }
            },
            relations : {
                products : true,
                vendor : true
            }
        });

        if(shopExist)
            return shopExist;
        throw new HttpException('this shop does not exist', HttpStatus.NOT_FOUND);
    }
}