import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class InvestorDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    pdf?: string;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) // Only allow 0 or 1
    status?: number;
}
