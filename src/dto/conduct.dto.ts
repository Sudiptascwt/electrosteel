import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class ConductDto {
    @IsNotEmpty({ message: 'title is required' })
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    pdf?: string;
}