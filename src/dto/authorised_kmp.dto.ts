import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class AuthorisedKmpDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    name: string;

    @IsString()
    post_name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;
}