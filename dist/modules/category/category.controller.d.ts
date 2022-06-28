import CategoryService from './category.service';
import CategoryDto from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(category: CategoryDto): Promise<"this category  already exist" | {
        category: import("./category.entity").Category[];
    }>;
    getAllCategories(): Promise<import("./category.entity").Category[]>;
    delete(id: number): Promise<void>;
    update(id: number, category: CategoryDto): Promise<import("typeorm").UpdateResult>;
    getCategoryById(id: number): Promise<import("./category.entity").Category[]>;
    getCategoryByName(name: number): Promise<import("./category.entity").Category[]>;
}
