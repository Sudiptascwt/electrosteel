import { IsNotEmpty, IsOptional, IsString, IsEnum, IsUrl, MaxLength } from 'class-validator';

export class growing_strength_dataDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;  

    @IsOptional()
    @IsString()
    image?: string;    
}