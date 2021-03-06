"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_service_1 = require("./customer.service");
const customer_controller_1 = require("./customer.controller");
const customer_entity_1 = require("./customer.entity");
const register_base_service_module_1 = require("../common/services/register-base-service/register-base-service.module");
const vendor_module_1 = require("../vendor/vendor.module");
<<<<<<< HEAD
const database_file_module_1 = require("../database-file/database-file.module");
=======
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
let CustomerModule = class CustomerModule {
};
CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => vendor_module_1.VendorModule),
            register_base_service_module_1.RegisterBaseServiceModule,
            database_file_module_1.DatabaseFileModule,
            typeorm_1.TypeOrmModule.forFeature([customer_entity_1.default])
        ],
        providers: [customer_service_1.CustomerService],
        controllers: [customer_controller_1.CustomerController],
        exports: [customer_service_1.CustomerService]
    })
], CustomerModule);
exports.CustomerModule = CustomerModule;
//# sourceMappingURL=customer.module.js.map