import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Category from './category.entity';
import CategoryDto from './dto/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}


    async create(category){
        var categoryExist = await this.categoryRepository.find({where: {name: category.name}});

        if(categoryExist)
            return "this category  already exist";
        
        const newCategory = await this.categoryRepository.create(category);
        const savedCategory = await this.categoryRepository.save(newCategory);

        return {category: savedCategory};
    }


    async delete(id : number){
        const categoryExist = await this.categoryRepository.find({where: {id: id}});

        if(categoryExist)
            await this.categoryRepository.delete(categoryExist[0].id);
        throw new NotFoundException('this category does not exist');
    }


    async update(id : number, category: CategoryDto ){
        const categoryExist = await this.categoryRepository.find({where: {id: id}});

        if(categoryExist)
            return await this.categoryRepository.update(id, category);
        throw new NotFoundException('this category does not exist');
    }

    async findOneByName(categoryName){
        const categoryExist = await this.categoryRepository.find({where : {name : categoryName}});

        if(categoryExist)
            return categoryExist;
        throw new NotFoundException('this category does not exist');
    }

    async findOneById(categoryId: number){
        const categoryExist = await this.categoryRepository.find({where : {id : categoryId}});

        if(categoryExist)
            return categoryExist;
        throw new NotFoundException('this category does not exist');
    }

    async findAll(){
        return await this.categoryRepository.find();
    }
}
export default CategoryService;