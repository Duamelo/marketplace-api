import { Entity, ManyToOne } from "typeorm";
import DatabaseFile from "../database-file/databaseFile.entity";
import Product from "../product/product.entity";

@Entity({name :'images'})
export class ImageHandler extends DatabaseFile{

    @ManyToOne(() => Product, (product) => product.images)
    product: Product
}
export default ImageHandler;