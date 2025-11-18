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
}
