import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class ProductApplicationImageDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    image: string;

    @IsNotEmpty()
    @IsEnum(['application', 'overview'])
    image_type: 'application' | 'overview';
}
