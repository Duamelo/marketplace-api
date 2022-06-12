import CategoryService from './category.service';
import CategoryDto from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
<<<<<<< HEAD
    create(category: CategoryDto): Promise<"this category  already exist" | {
=======
    create(category: CategoryDto): Promise<"this category already exist" | {
>>>>>>> f9045c72487abed600862f17274d924fdc77e514
        category: import("./category.entity").Category[];
    }>;
}
