import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

class CreateCustomerDto {

    @IsNotEmpty()
    readonly firstName: string;


    @IsNotEmpty()
    readonly lastName: string;
    
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    

    @IsNotEmpty()
    readonly phone: string;
    
    
    @IsNotEmpty()
    readonly address: string;
    

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}

export default CreateCustomerDto;