"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const customer_entity_1 = require("../../modules/customer/customer.entity");
const vendor_entity_1 = require("../../modules/vendor/vendor.entity");
const category_entity_1 = require("../../modules/category/category.entity");
const product_entity_1 = require("../../modules/product/product.entity");
const shop_entity_1 = require("../../modules/shop/shop.entity");
const databaseFile_entity_1 = require("../../modules/database-file/databaseFile.entity");
const imageHandler_entity_1 = require("../../modules/images-handler/imageHandler.entity");
const cart_entity_1 = require("../../modules/cart/cart.entity");
const command_entity_1 = require("../../modules/command/command.entity");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    port: configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    entities: [
                        customer_entity_1.default, vendor_entity_1.default, category_entity_1.default, product_entity_1.default, shop_entity_1.default, databaseFile_entity_1.default, imageHandler_entity_1.default, cart_entity_1.default, command_entity_1.default
                    ],
                    synchronize: true,
                })
            }),
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map