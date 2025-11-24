import { IsString, IsOptional, IsEnum } from 'class-validator';

export class DuctileIronDetailsDto {
    @IsString()
    title: string;

    @IsString()
    dimension: string;

    @IsString()
    pressure_class: string;

    @IsEnum([0, 1])
    @IsOptional()
    status?: 0 | 1;
}