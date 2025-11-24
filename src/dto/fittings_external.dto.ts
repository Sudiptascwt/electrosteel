import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FittingsExternalPipesDto {
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

    @IsEnum([0, 1])
    @IsOptional()
    status?: 0 | 1;
}