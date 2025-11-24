import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class JolsadhanaDto {
    @IsOptional()
    @IsString()
    meta_key: string;

    @IsOptional()
    @IsString()
    meta_value: string;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) // Only allow 0 or 1
    status?: number;
}
