import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class ProductTypeDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
