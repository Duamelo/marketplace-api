import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import Role from 'src/modules/common/roles/role.enum';

class CreateVendorDto {

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
    readonly role : string = Role.Vendor;
    
    
    @IsNotEmpty()
    readonly address: string;
    

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}
export default CreateVendorDto;