import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreatePedidoDto {
    @IsString()
    client: string;
    @IsNumber()
    total: number;
    @IsString()
    status: string;
    @IsDateString()
    created_at: string;
}
