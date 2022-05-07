import { Entity, PrimaryGeneratedColumn, Column/*, OneToMany, ManyToOne*/ } from "typeorm"

@Entity({name: 'category'})
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @Column()
    // category: Category;

    
    // @OneToMany(() => Category, (subCategory) =>subCategory.category)
    // subCategories: Category[];
}
export default Category;