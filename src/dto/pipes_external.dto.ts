import { IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class ExternalPipesDto {
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

    @IsInt()
    pdf_id: number;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) 
    status?: number;
}
