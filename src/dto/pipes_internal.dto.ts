import { IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class InternalPipesDto {
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

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) 
    status?: number;
}
