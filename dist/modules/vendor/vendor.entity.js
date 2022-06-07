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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/users/base.entity");
const shop_entity_1 = require("../shop/shop.entity");
let Vendor = class Vendor extends base_entity_1.User {
};
__decorate([
    (0, typeorm_1.OneToMany)(() => shop_entity_1.default, (shop) => shop.vendor),
    __metadata("design:type", Array)
], Vendor.prototype, "shops", void 0);
Vendor = __decorate([
    (0, typeorm_1.Entity)({ name: 'vendor' })
], Vendor);
exports.Vendor = Vendor;
exports.default = Vendor;
//# sourceMappingURL=vendor.entity.js.map