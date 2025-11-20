import { IsInt, IsOptional, IsString } from 'class-validator';

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
}
