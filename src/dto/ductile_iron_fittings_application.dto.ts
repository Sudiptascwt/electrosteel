import { IsString, IsOptional, IsInt } from 'class-validator';

export class DuctileIronFittingsApplicationsDto {
    @IsString()
    features: string;

    @IsString()
    images: string;

    @IsOptional()
    @IsInt()
    images_id: number;

    @IsString()
    below_images: string;

    @IsOptional()
    @IsInt()
    below_images_id: number;
}