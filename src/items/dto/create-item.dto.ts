import { IsNumber, IsString } from "class-validator"

export class CreateItemDto {
    @IsString()
    product: string;
    @IsNumber()
    quantity: number;
    @IsNumber()
    price: number;
}
