import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateContactDetailsDto {
    @IsNotEmpty({ message: 'Office ID is required' })
    @IsNumber()
    office_id: number;

    @IsOptional()
    @IsString()
    contact_person?: string;

    @IsOptional()
    @IsString()
    phone_no?: string;

    @IsOptional()
    @IsString()
    alter_phone_no?: string;

    @IsOptional()
    @IsString()
    fax?: string;

    @IsOptional()
    @IsString()
    fax_branch?: string;
}

export class UpdateContactDetailsDto {
    @IsOptional()
    @IsNumber()
    office_id?: number;

    @IsOptional()
    @IsString()
    contact_person?: string;

    @IsOptional()
    @IsString()
    phone_no?: string;

    @IsOptional()
    @IsString()
    alter_phone_no?: string;

    @IsOptional()
    @IsString()
    fax?: string;

    @IsOptional()
    @IsString()
    fax_branch?: string;
}
