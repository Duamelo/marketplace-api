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
exports.RegisterBaseService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let RegisterBaseService = class RegisterBaseService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async generateToken(user) {
<<<<<<< HEAD
        const { firstName, lastName, email, phone, address, role } = user;
        console.log("generate token");
        console.log(user);
        const token = await this.jwtService.signAsync({ firstName, lastName, email, phone, address, role });
=======
        const { firstName, lastName, email, phone, address } = user;
        const token = await this.jwtService.signAsync({ firstName, lastName, email, phone, address });
>>>>>>> main
        return token;
    }
    async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
};
RegisterBaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], RegisterBaseService);
exports.RegisterBaseService = RegisterBaseService;
exports.default = RegisterBaseService;
//# sourceMappingURL=register-base-service.js.map