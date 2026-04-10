import { IsNotEmpty, IsOptional, IsString, IsEnum, IsUrl, MaxLength } from 'class-validator';

export class water_sectionDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    sub_title?: string;  

    @IsOptional()
    @IsString()
    description?: string;    

    @IsOptional()
    @IsString()
    @MaxLength(255)
    video?: string; 

    @IsOptional()
    @IsString()
    url?: string;  
}