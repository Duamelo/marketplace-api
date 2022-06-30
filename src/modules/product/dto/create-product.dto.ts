import { IsNotEmpty, IsNumber } from 'class-validator';

class CreateProductDto {

    @IsNotEmpty()
    readonly name: string;


    @IsNotEmpty()
    readonly description: string;
    
    @IsNotEmpty()
    readonly price: string;
    
    
    @IsNotEmpty()
    readonly reference: string;

    @IsNotEmpty()
    @IsNumber()
    readonly shopId: number;

    @IsNotEmpty()
    readonly categories : Array<string>;
}
export default CreateProductDto;