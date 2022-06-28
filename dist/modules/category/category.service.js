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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./category.entity");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(category) {
        var categoryExist = await this.categoryRepository.find({ where: { name: category.name } });
        if (categoryExist)
            return "this category  already exist";
        const newCategory = await this.categoryRepository.create(category);
        const savedCategory = await this.categoryRepository.save(newCategory);
        return { category: savedCategory };
    }
    async delete(id) {
        const categoryExist = await this.categoryRepository.find({ where: { id: id } });
        if (categoryExist)
            await this.categoryRepository.delete(categoryExist[0].id);
        throw new common_1.NotFoundException('this category does not exist');
    }
    async update(id, category) {
        const categoryExist = await this.categoryRepository.find({ where: { id: id } });
        if (categoryExist)
            return await this.categoryRepository.update(id, category);
        throw new common_1.NotFoundException('this category does not exist');
    }
    async findOneByName(categoryName) {
        const categoryExist = await this.categoryRepository.find({ where: { name: categoryName } });
        if (categoryExist)
            return categoryExist;
        throw new common_1.NotFoundException('this category does not exist');
    }
    async findOneById(categoryId) {
        const categoryExist = await this.categoryRepository.find({ where: { id: categoryId } });
        if (categoryExist)
            return categoryExist;
        throw new common_1.NotFoundException('this category does not exist');
    }
    async findAll() {
        return await this.categoryRepository.find();
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
exports.default = CategoryService;
//# sourceMappingURL=category.service.js.map