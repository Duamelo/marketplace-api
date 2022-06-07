import { IsNotEmpty, IsNumber } from 'class-validator';

class CreateShippingDto {

    @IsNotEmpty()
    readonly type: string;


    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
    
    
    @IsNotEmpty()
    @IsNumber()
    readonly priceWithTaxe: number;
}

export default CreateShippingDto;