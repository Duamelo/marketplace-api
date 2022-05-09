"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./core/database/database.module");
const authentication_module_1 = require("./modules/authentication/authentication.module");
const vendor_module_1 = require("./modules/vendor/vendor.module");
const customer_module_1 = require("./modules/customer/customer.module");
const Joi = require("@hapi/joi");
const register_base_service_module_1 = require("./modules/common/services/register-base-service/register-base-service.module");
const shop_module_1 = require("./modules/shop/shop.module");
const product_module_1 = require("./modules/product/product.module");
const category_module_1 = require("./modules/category/category.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    POSTGRES_HOST: Joi.string().required(),
                    POSTGRES_PORT: Joi.number().required(),
                    POSTGRES_USER: Joi.string().required(),
                    POSTGRES_PASSWORD: Joi.string().required(),
                    POSTGRES_DB: Joi.string().required(),
                    PORT: Joi.number(),
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRATION_TIME: Joi.string().required(),
                })
            }),
            database_module_1.DatabaseModule,
            vendor_module_1.VendorModule,
            customer_module_1.CustomerModule,
            authentication_module_1.AuthenticationModule,
            register_base_service_module_1.RegisterBaseServiceModule,
            shop_module_1.ShopModule,
            product_module_1.ProductModule,
            category_module_1.CategoryModule
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map