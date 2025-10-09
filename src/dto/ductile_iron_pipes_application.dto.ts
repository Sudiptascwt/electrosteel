import { IsString, IsOptional } from 'class-validator';

export class DuctileIronPipeApplicationsDto {
    @IsString()
    features: string;

    @IsString()
    images: string;

    @IsString()
    below_images: string;
}