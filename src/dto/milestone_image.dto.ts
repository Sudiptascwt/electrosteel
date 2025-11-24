import { IsOptional, IsString, IsNumber, IsIn, IsInt } from 'class-validator';

export class MilestoneImageDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsInt()
    image_id?: number;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) // Only allow 0 or 1
    status?: number;
}
