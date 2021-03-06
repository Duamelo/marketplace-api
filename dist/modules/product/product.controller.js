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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const jwt_authentication_guard_1 = require("../authentication/jwt.authentication.guard");
const create_product_dto_1 = require("./dto/create-product.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async addProduct(product) {
        return await this.productService.create(product);
    }
<<<<<<< HEAD
    async getProductById(productId) {
        return await this.productService.getProductById(productId);
    }
=======
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
<<<<<<< HEAD
    (0, common_1.Post)(),
=======
    (0, common_1.Post)('add'),
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.default]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
<<<<<<< HEAD
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Get)(':productId'),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
ProductController = __decorate([
    (0, common_1.Controller)('products'),
=======
ProductController = __decorate([
    (0, common_1.Controller)('product'),
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
    __metadata("design:paramtypes", [product_service_1.default])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map