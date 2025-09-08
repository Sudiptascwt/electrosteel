import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class OfficeDetailsDto {
    @IsNotEmpty()
    @IsString()
    office_type: string;

    @IsOptional()
    @IsString()
    contact_title?: string;

    @IsOptional()
    @IsUrl()
    google_map_link?: string;

    @IsOptional()
    @IsString()
    address?: string;
}
