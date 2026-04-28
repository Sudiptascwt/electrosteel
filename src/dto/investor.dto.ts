import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class InvestorDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    pdf?: string;

}
