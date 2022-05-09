import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

class CreateProductDto {

    @IsNotEmpty()
    readonly name: string;


    @IsNotEmpty()
    readonly description: string;
    
    
    @IsNotEmpty()
    @IsEmail()
    readonly images: string;
    

    @IsNotEmpty()
    readonly price: string;
    
    
    @IsNotEmpty()
    readonly reference: string;

    @IsNotEmpty()
    @IsNumber()
    readonly shopId: number;
}

export default CreateProductDto;