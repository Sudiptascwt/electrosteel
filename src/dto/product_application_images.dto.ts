import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

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

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) // Only allow 0 or 1
    status?: number;
}
