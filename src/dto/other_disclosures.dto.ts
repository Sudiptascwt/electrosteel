import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OtherDisclosureDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    pdf: string;

    @IsOptional()
    @IsInt()
    pdf_id: number

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) 
    status?: number;
}
