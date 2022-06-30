import { IsNotEmpty } from 'class-validator';

export class CreateShopDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly location: string;
}
export default CreateShopDto;