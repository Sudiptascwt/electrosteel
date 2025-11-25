import { IsNotEmpty, IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class SubsidiariesDto {
    @IsNotEmpty({ message: 'Country link is required' })
    @IsNumber({}, { message: 'Country link must be a number' })
    country_link: string;

    @IsOptional()
    @IsString({ message: 'Country style must be a string' })
    country_style?: string;

    @IsOptional()
    @IsString({ message: 'Country name must be a string' })
    country_name?: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) // Only allow 0 or 1
    status?: number;
}
