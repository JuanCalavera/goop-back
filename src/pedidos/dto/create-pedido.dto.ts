import { IsArray, IsDateString, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePedidoDto {
    @IsString()
    client: string;

    @IsNotEmpty()
    @IsArray()
    items: Array<number>

    @IsNumber()
    total: number;

    @IsString()
    status: string;
}
