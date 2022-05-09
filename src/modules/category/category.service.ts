import { Injectable } from '@nestjs/common';
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

        console.log(categoryExist);
        if(categoryExist.length > 0)
            return "this category  already exist";
        
        const newCategory = await this.categoryRepository.create(category);
        const savedCategory = await this.categoryRepository.save(newCategory);

        return {category: savedCategory};
    }


    async delete(category: any){

        const cat = await this.categoryRepository.find({where: {name: category.name}});

    }


    async update(category: CategoryDto ){

    }

    async getCategoryByName(category: string){

    }
}
export default CategoryService;