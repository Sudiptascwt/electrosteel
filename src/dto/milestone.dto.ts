import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

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
}
