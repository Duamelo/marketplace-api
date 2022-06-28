import CreateShopDto from './dto/create-shop.dto';
import { ShopService } from './shop.service';
export declare class ShopController {
    private readonly shopService;
    constructor(shopService: ShopService);
    create(shop: CreateShopDto, req: any): Promise<"this name shop already exist. Please give another name to your shop" | {
        shop: import("./shop.entity").Shop;
    }>;
    getAllShops(): Promise<import("./shop.entity").Shop[]>;
    getShopByName(name: string, req: any): Promise<import("./shop.entity").Shop[]>;
}
