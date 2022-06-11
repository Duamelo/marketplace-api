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
    constructor(customerRepository, registerBaseService, databaseFilesService, connection) {
        this.customerRepository = customerRepository;
        this.registerBaseService = registerBaseService;
        this.databaseFilesService = databaseFilesService;
        this.connection = connection;
    }
    async create(customer) {
        const user = await this.customerRepository.find({ where: { email: customer.email } });
        console.log(user.length);
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
        throw new common_1.HttpException('Customer email already exist', common_1.HttpStatus.NOT_FOUND);
    }
    async getAllCustomer() {
        return this.customerRepository.find();
    }
    async getByEmail(email) {
        const customerMail = await this.customerRepository.findOne({ where: { email: `${email}` } });
        if (customerMail) {
            return customerMail;
        }
        throw new common_1.HttpException('Customer email not found', common_1.HttpStatus.NOT_FOUND);
    }
    async getById(id) {
<<<<<<< HEAD
        return await this.customerRepository.findOne({ where: { id: id } });
    }
    async addAvatar(userId, imageBuffer, filename, mimetype) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await queryRunner.manager.findOne(customer_entity_1.default, { where: { id: userId } });
            const currentAvatarId = user.avatarId;
            const avatar = await this.databaseFilesService.uploadDatabaseFileWithQueryRunner(imageBuffer, filename, mimetype, queryRunner);
            await queryRunner.manager.update(customer_entity_1.default, userId, {
                avatarId: avatar.id
            });
            if (currentAvatarId) {
                await this.databaseFilesService.deleteFileWithQueryRunner(currentAvatarId, queryRunner);
            }
            await queryRunner.commitTransaction();
            return avatar;
        }
        catch (_a) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException();
        }
        finally {
            await queryRunner.release();
        }
=======
        const customer = await this.customerRepository.findOne({ where: { id: id } });
        if (customer) {
            return customer;
        }
        throw new common_1.HttpException('Customer not found.', common_1.HttpStatus.NOT_FOUND);
    }
    async updateCustomer(id, post) {
        const user = await this.customerRepository.find({ where: { id: id } });
        console.log(user.length);
        if (user.length != 0) {
            const user_email = await this.customerRepository.find({ where: { email: post.email } });
            const hashPassword = await this.registerBaseService.hashPassword(post.password);
            post.password = hashPassword;
            if (user_email.length == 0) {
                await this.customerRepository.update(id, post);
                const updatedCustomer = await this.customerRepository.findOne({ where: { id: id } });
                if (updatedCustomer) {
                    return updatedCustomer;
                }
                throw new common_1.HttpException('Failed to update', common_1.HttpStatus.NOT_FOUND);
            }
            else {
                const mail_exist = await this.customerRepository.findOne({ where: { id: id } });
                if (mail_exist.email == post.email) {
                    await this.customerRepository.update(id, post);
                    const updatedCustomer = await this.customerRepository.findOne({ where: { id: id } });
                    if (updatedCustomer) {
                        return updatedCustomer;
                    }
                    throw new common_1.HttpException('Failed to update', common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException('Email already exist.', common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException('Email already exist.', common_1.HttpStatus.NOT_FOUND);
        }
        throw new common_1.HttpException('Customer not found', common_1.HttpStatus.NOT_FOUND);
    }
    async deleteCustomer(id) {
        const user = await this.customerRepository.find({ where: { id: id } });
        console.log(user.length);
        if (user.length != 0) {
            const deletedCustomer = await this.customerRepository.delete(id);
            if (!deletedCustomer.affected) {
                throw new common_1.HttpException('Failed to delete', common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException('Le client ' + user[0].firstName + ' ' + user[0].lastName + ' a été supprimé avec succès', common_1.HttpStatus.FOUND);
            }
        }
        throw new common_1.HttpException('Customer not found', common_1.HttpStatus.NOT_FOUND);
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        register_base_service_1.default,
        database_file_service_1.default,
        typeorm_2.Connection])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map