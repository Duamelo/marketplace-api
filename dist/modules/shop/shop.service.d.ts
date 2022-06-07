import { Repository } from 'typeorm';
import CreateShopDto from './dto/create-shop.dto';
import Shop from './shop.entity';
export declare class ShopService {
    private readonly shopRepository;
    constructor(shopRepository: Repository<Shop>);
    create(shop: CreateShopDto, vendorId: any): Promise<"this name shop already exist. Please give another name to your shop" | {
        shop: Shop;
    }>;
}
