import { Repository } from 'typeorm';
import Category from './category.entity';
import CategoryDto from './dto/category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
<<<<<<< HEAD
    create(category: any): Promise<"this category  already exist" | {
=======
    create(category: any): Promise<"this category already exist" | {
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
        category: Category[];
    }>;
    delete(category: any): Promise<void>;
    update(category: CategoryDto): Promise<void>;
    getCategoryByName(category: string): Promise<void>;
}
export default CategoryService;
