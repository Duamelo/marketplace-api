import { IsNotEmpty, IsString} from 'class-validator';


class CreateOrderDto {

    @IsNotEmpty()
    readonly cartId: number;

    @IsNotEmpty()
    @IsString()
    readonly shippingAddress: string;

}
export default CreateOrderDto;
