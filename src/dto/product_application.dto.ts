import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class ProductApplicationDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) // Only allow 0 or 1
    status?: number;
}
