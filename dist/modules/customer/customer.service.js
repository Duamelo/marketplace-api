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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const register_base_service_1 = require("../common/services/register-base-service/register-base-service");
const database_file_service_1 = require("../database-file/database-file.service");
const customer_entity_1 = require("./customer.entity");
let CustomerService = class CustomerService {
    constructor(customerRepository, registerBaseService, databaseFilesService) {
        this.customerRepository = customerRepository;
        this.registerBaseService = registerBaseService;
        this.databaseFilesService = databaseFilesService;
    }
    async create(customer) {
        const user = await this.customerRepository.find({ where: { email: customer.email } });
        console.log("user");
        console.log(user);
        if (user.length == 0) {
            const hashPassword = await this.registerBaseService.hashPassword(customer.password);
            customer.password = hashPassword;
            const newCustomer = await this.customerRepository.create(customer);
            const client = await this.customerRepository.save(newCustomer);
            console.log(client);
            const token = await this.registerBaseService.generateToken(client);
            return { user: client, token: token };
        }
    }
    async getByEmail(email) {
        return await this.customerRepository.findOne({ where: { email } });
    }
    async getById(id) {
        return await this.customerRepository.findOne({ where: { id: id } });
    }
    async addAvatar(userId, imageBuffer, filename) {
        const avatar = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
        await this.customerRepository.update(userId, {
            avatarId: avatar.id
        });
        return avatar;
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        register_base_service_1.default,
        database_file_service_1.default])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map