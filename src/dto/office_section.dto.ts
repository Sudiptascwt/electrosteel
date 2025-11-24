import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class OfficeDetailsDto {
    @IsNotEmpty()
    @IsString()
    office_type: string;

    @IsNotEmpty()
    @IsString()
    banner_image: string;

    @IsOptional()
    @IsString()
    contact_title?: string;

    @IsOptional()
    @IsUrl()
    google_map_link?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) 
    status?: number;
}
