import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CorporateGovernanceDto {
    @IsNotEmpty()
    @IsString()
    start_date: string;
    
    @IsNotEmpty()
    @IsString()
    end_date: string;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    pdf: string;

    @IsOptional()
    @IsInt()
    pdf_id: number;

    @IsEnum([0, 1])
    @IsOptional()
    status?: 0 | 1;
}
