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
exports.ShopController = void 0;
const common_1 = require("@nestjs/common");
const jwt_authentication_guard_1 = require("../authentication/jwt.authentication.guard");
const create_shop_dto_1 = require("./dto/create-shop.dto");
const shop_service_1 = require("./shop.service");
let ShopController = class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }
    async create(shop, req) {
        return await this.shopService.create(shop, req.user.id);
    }
    async getAllShops() {
        return await this.shopService.findAll();
    }
    async getShopByName(name, req) {
        return await this.shopService.findOneByName(name, req.user.id);
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shop_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getAllShops", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getShopByName", null);
ShopController = __decorate([
    (0, common_1.Controller)('shop'),
    __metadata("design:paramtypes", [shop_service_1.ShopService])
], ShopController);
exports.ShopController = ShopController;
//# sourceMappingURL=shop.controller.js.map