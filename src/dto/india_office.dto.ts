// src/dto/global_presence.dto.ts
import { IsString, IsArray, IsOptional, IsUrl, IsEmail } from 'class-validator';

export class indiaOfficeDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    direction?: string;

    @IsArray()
    @IsOptional()
    address?: string[];

    @IsArray()
    @IsOptional()
    contact?: string[];

    @IsString()
    @IsOptional()
    map_link?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    fax?: string;

    @IsString()
    @IsOptional()
    website?: string;

    @IsString()
    @IsOptional()
    contact_person?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    label?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsOptional()
    properties?: any;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    btn_link?: string;

    @IsString()
    @IsOptional()
    category?: string;
}