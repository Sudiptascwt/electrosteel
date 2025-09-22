import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
