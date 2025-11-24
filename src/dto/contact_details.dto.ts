import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

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

    @IsEnum([0, 1])
    @IsOptional()
    status?: 0 | 1;
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

    @IsEnum([0, 1])
    @IsOptional()
    status?: 0 | 1;
}
