import { IsOptional, IsString, IsNumber, IsIn, IsInt } from 'class-validator';

export class MilestoneDto {

    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    year?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    heading?: string;
}
