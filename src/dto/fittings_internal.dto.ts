import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class FittingsInternalPipesDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    guiding_stadards: string;

    @IsString()
    url: string;

    @IsString()
    pdf: string;

    @IsOptional()
    @IsInt()
    pdf_id: number;

    @IsEnum([0, 1])
    @IsOptional()
    status?: 0 | 1;
}
