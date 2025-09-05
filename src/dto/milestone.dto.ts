import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class MilestoneDto {
    @IsOptional()
    @IsString()
    year?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) // Only allow 0 or 1
    status?: number;
}
