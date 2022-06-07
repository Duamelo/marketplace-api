import { IsNotEmpty} from 'class-validator';
import CartDto from './cart.dto';

class CreateCartDto {

    @IsNotEmpty()
    readonly items: CartDto[];
}
export default CreateCartDto;
