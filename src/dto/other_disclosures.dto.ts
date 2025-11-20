import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OtherDisclosureDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    pdf: string;

    @IsOptional()
    @IsInt()
    pdf_id: number
}
