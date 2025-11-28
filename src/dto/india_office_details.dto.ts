import { IsOptional, IsString, IsEmail } from 'class-validator';

export class AllOfficeDetailsDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    region?: string;

    @IsOptional()
    @IsString()
    direction?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    ph_no?: string;

    @IsOptional()
    @IsString()
    alternate_ph_no?: string;

    @IsOptional()
    @IsString()
    fax_no?: string;

    @IsOptional()
    @IsString()
    contact_person?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    google_map_link?: string;
}
