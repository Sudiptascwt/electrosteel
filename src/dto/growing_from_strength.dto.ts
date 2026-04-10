import { IsNotEmpty, IsOptional, IsString, IsEnum, IsUrl, MaxLength } from 'class-validator';

export class growing_from_strengthDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    sub_title?: string;  

    @IsOptional()
    @IsString()
    box_data?: string;    

    @IsOptional()
    @IsString()
    @MaxLength(255)
    image?: string; 

    @IsOptional()
    @IsString()
    @MaxLength(255)
    video?: string;  
}