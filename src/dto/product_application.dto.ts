import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class ProductApplicationDto {
    @IsNotEmpty()
    @IsString()
    title: string;
}
