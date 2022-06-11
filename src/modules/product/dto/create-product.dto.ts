import { IsNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';

class CreateProductDto {

    @IsNotEmpty()
    readonly name: string;


    @IsNotEmpty()
    readonly description: string;
    
    // @IsNotEmpty()
    // @IsEmail()
    // readonly images: string;
    @IsNotEmpty()
    readonly images: string;
    

    @IsNotEmpty()
    readonly price: string;
    
    
    @IsNotEmpty()
    readonly reference: string;

    @IsNotEmpty()
    @IsNumber()
    readonly shopId: number;

    @IsNotEmpty()
    @IsString()
    readonly productName: string;
}
export default CreateProductDto;