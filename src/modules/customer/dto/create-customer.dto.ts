import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

class CreateCustomerDto {

    @IsNotEmpty({message: 'Nom requis svp'})
    readonly firstName: string;


    @IsNotEmpty({message: 'Prénom requis svp'})
    readonly lastName: string;
    
    
    @IsNotEmpty({message: 'email requis svp'})
    @IsEmail()
    readonly email: string;
    

    @IsNotEmpty({message: 'Numéro de teléphone requis svp'})
    readonly phone: string;
    
    
    @IsNotEmpty({message: 'Adresse requis svp'})
    readonly address: string;
    

    @IsNotEmpty({message: 'Mot de passe requis svp'})
    @MinLength(6, {
        message: 'Mot de passe trop court',
      })

    readonly password: string;
}

export default CreateCustomerDto;