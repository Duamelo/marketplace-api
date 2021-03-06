import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'category'})
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
export default Category;