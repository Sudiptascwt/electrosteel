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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MilestoneDto)
    milestones: MilestoneDto[];
}
