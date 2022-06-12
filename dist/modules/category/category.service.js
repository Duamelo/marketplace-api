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
<<<<<<< HEAD
        if (categoryExist.length > 0)
            return "this category  already exist";
=======
        console.log(categoryExist);
        if (categoryExist.length > 0)
            return "this category already exist";
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
        const newCategory = await this.categoryRepository.create(category);
        const savedCategory = await this.categoryRepository.save(newCategory);
        return { category: savedCategory };
    }
    async delete(category) {
<<<<<<< HEAD
=======
        const cat = await this.categoryRepository.find({ where: { name: category.name } });
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
    }
    async update(category) {
    }
    async getCategoryByName(category) {
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