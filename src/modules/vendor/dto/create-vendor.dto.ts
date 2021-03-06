import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import Role from 'src/modules/common/roles/role.enum';

class CreateVendorDto {

    @IsNotEmpty({message: 'Nom requis svp'})
    readonly firstName: string;


    @IsNotEmpty({message: 'Prénom requis svp'})
    readonly lastName: string;
    
    
    @IsNotEmpty({message: 'Mail requis svp'})
    @IsEmail()
    readonly email: string;
    

    @IsNotEmpty({message: 'Numéro requis svp'})
    readonly phone: string;
    
    
    @IsNotEmpty({message: 'Adresse requis svp'})
    readonly address: string;
    
    @IsNotEmpty()
    readonly role: string = Role.Vendor;

    @IsNotEmpty({message: 'Mot de passe requis svp'})
    @MinLength(6, {
        message: 'Mot de passe trop court',
    })
    readonly password: string;
}

export default CreateVendorDto;