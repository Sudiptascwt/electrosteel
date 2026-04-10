import { IsNotEmpty, IsOptional, IsString, IsEnum, IsUrl, MaxLength } from 'class-validator';

export class ecl_productsDto {

    @IsOptional()
    @IsString()
    label?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    sublabel?: string;  

    @IsOptional()
    @IsString()
    @MaxLength(255)
    icon?: string;    

    @IsOptional()
    @IsString()
    title?: string; 

    @IsOptional()
    @IsString()
    description?: string;  

    @IsOptional()
    @IsString()
    @MaxLength(255)
    properties?: string;  

    @IsOptional()
    @IsString()
    @MaxLength(255)
    image?: string;  

    @IsOptional()
    @IsString()
    @MaxLength(255)
    btnLink?: string;  
}