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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const customer_service_1 = require("../customer/customer.service");
const register_base_service_1 = require("../common/services/register-base-service/register-base-service");
const vendor_service_1 = require("../vendor/vendor.service");
let AuthenticationService = class AuthenticationService {
    constructor(customerService, vendorService, jwtService, configService, registerBaseService) {
        this.customerService = customerService;
        this.vendorService = vendorService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.registerBaseService = registerBaseService;
    }
    async validateUser(email, pass) {
        const customer = await this.customerService.getByEmail(email);
        const vendor = await this.vendorService.getByEmail(email);
<<<<<<< HEAD
=======
        console.log("customer");
        console.log(customer);
        console.log(vendor);
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
        if (!customer && !vendor) {
            return null;
        }
        const match = await this.comparePassword(pass, customer ? customer.password : vendor.password);
        if (!match) {
            return null;
        }
        const _a = customer ? customer : vendor, { password } = _a, result = __rest(_a, ["password"]);
        return result;
    }
    async login(user) {
        const token = await this.registerBaseService.generateToken(user);
        return { user, token };
    }
    async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
    getCookieWithJwtToken(userId) {
        const payload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }
    getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; MAx-Age=0`;
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService,
        vendor_service_1.VendorService,
        jwt_1.JwtService,
        config_1.ConfigService,
        register_base_service_1.default])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map