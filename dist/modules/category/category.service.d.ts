import { Repository } from 'typeorm';
import Category from './category.entity';
import CategoryDto from './dto/category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(category: any): Promise<"this category  already exist" | {
        category: Category[];
    }>;
    delete(id: number): Promise<void>;
    update(id: number, category: CategoryDto): Promise<import("typeorm").UpdateResult>;
    findOneByName(categoryName: any): Promise<Category[]>;
    findOneById(categoryId: number): Promise<Category[]>;
    findAll(): Promise<Category[]>;
}
export default CategoryService;
