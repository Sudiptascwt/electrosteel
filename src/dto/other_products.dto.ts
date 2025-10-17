import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class OtherProductsDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    image: string;

    @IsOptional()
    @IsString()
    description?: string;
}