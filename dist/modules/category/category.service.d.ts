import { Repository } from 'typeorm';
import Category from './category.entity';
import CategoryDto from './dto/category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(category: any): Promise<"this category already exist" | {
        category: Category[];
    }>;
    delete(category: any): Promise<void>;
    update(category: CategoryDto): Promise<void>;
    getCategoryByName(category: string): Promise<void>;
}
export default CategoryService;
