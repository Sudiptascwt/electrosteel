import { IsString, IsOptional, IsInt, IsUrl, IsDate, IsNotEmpty, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

// Create Nodal Officer DTO
export class NodalOfficerDto {

    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    link?: string;
}
