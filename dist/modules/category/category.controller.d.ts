import CategoryService from './category.service';
import CategoryDto from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(category: CategoryDto): Promise<"this category already exist" | {
        category: import("./category.entity").Category[];
    }>;
}
