import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'category'})
export class Category {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
}
export default Category;