import { IsString, IsOptional } from 'class-validator';

export class DuctileIronDetailsDto {
    @IsString()
    title: string;

    @IsString()
    dimension: string;

    @IsString()
    pressure_class: string;
}