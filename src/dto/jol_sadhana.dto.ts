import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class JolsadhanaDto {
    @IsOptional()
    @IsString()
    meta_key: string;

    @IsOptional()
    @IsString()
    meta_value: string;
}
