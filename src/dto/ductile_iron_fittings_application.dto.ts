import { IsString, IsOptional } from 'class-validator';

export class DuctileIronFittingsApplicationsDto {
    @IsString()
    features: string;

    @IsString()
    images: string;

    @IsString()
    below_images: string;
}