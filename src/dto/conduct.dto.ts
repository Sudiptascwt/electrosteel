import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt } from 'class-validator';

export class ConductDto {
    @IsNotEmpty({ message: 'title is required' })
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    pdf?: string;

    @IsOptional()
    @IsInt()
    pdf_id?: number;
}