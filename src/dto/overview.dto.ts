// create-overview-section.dto.ts
import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OverviewDto {
    id?: number;
    title?: string;
    desc?: string;
    image?: any; // Can be object or array
    tableData?: any; // Can be object
}