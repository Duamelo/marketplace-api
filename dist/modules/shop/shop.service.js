"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shop_entity_1 = require("./shop.entity");
let ShopService = class ShopService {
    constructor(shopRepository) {
        this.shopRepository = shopRepository;
    }
    async create(shop, vendorId) {
        var shopExist = await this.shopRepository.find({ where: { name: shop.name } });
        if (shopExist.length > 0)
            return "this name shop already exist. Please give another name to your shop";
        const rest = shop;
        const newShop = await this.shopRepository.create(Object.assign(Object.assign({}, rest), { vendor: {
                id: vendorId
            } }));
        const _shop = await this.shopRepository.save(newShop);
        return { shop: _shop };
    }
};
ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shop_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShopService);
exports.ShopService = ShopService;
//# sourceMappingURL=shop.service.js.map