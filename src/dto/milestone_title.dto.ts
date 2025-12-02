import { IsOptional, IsString, IsNumber, IsIn, IsArray, ValidateNested } from 'class-validator';
import { MilestoneDto } from './milestone.dto';
import { Type } from 'class-transformer';

export class MilestoneTitleDto {

    @IsOptional()
    @IsString()
    name1?: string

    @IsOptional()
    @IsString()
    name2?: string;

    @IsOptional()
    @IsString()
    url?: string;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) // Only allow 0 or 1
    status?: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MilestoneDto)
    milestones: MilestoneDto[];
}
