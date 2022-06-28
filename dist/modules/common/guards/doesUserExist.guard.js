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
exports.DoesUserExist = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("../../customer/customer.service");
const vendor_service_1 = require("../../vendor/vendor.service");
let DoesUserExist = class DoesUserExist {
    constructor(vendorService, customerService) {
        this.vendorService = vendorService;
        this.customerService = customerService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    async validateRequest(request) {
        const customer = await this.customerService.findOneByEmail(request.body.email);
        const vendor = await this.vendorService.findOneByEmail(request.body.email);
        if (customer || vendor) {
            throw new common_1.ForbiddenException('This email already exist');
        }
        return true;
    }
};
DoesUserExist = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => vendor_service_1.VendorService))),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => customer_service_1.CustomerService))),
    __metadata("design:paramtypes", [vendor_service_1.VendorService,
        customer_service_1.CustomerService])
], DoesUserExist);
exports.DoesUserExist = DoesUserExist;
//# sourceMappingURL=doesUserExist.guard.js.map