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
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
<<<<<<< HEAD
const platform_express_1 = require("@nestjs/platform-express");
const jwt_authentication_guard_1 = require("../authentication/jwt.authentication.guard");
const doesUserExist_guard_1 = require("../common/guards/doesUserExist.guard");
=======
const jwt_authentication_guard_1 = require("../authentication/jwt.authentication.guard");
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
const customer_service_1 = require("./customer.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
let CustomerController = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async register(customer) {
        return await this.customerService.create(customer);
    }
<<<<<<< HEAD
    async addAvatar(request, file) {
        return this.customerService.addAvatar(request.user.id, file.buffer, file.originalname, file.mimetype);
=======
    getCustomer() {
        return this.customerService.getAllCustomer();
    }
    getCustomerById(id) {
        return this.customerService.getById(id);
    }
    getCustomerByEmail(email) {
        return this.customerService.getByEmail(email);
    }
    async update(id, user) {
        return await this.customerService.updateCustomer(id, user);
    }
    async deleteCustomer(id) {
        return await this.customerService.deleteCustomer(id);
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
    }
};
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.default]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "register", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Post)('avatar'),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addAvatar", null);
=======
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getCustomerById", null);
__decorate([
    (0, common_1.Get)('/email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getCustomerByEmail", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.default),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_customer_dto_1.default]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCustomer", null);
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
CustomerController = __decorate([
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map