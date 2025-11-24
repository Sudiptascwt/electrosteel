import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

export class DuctileIronPipeApplicationsDto {
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

    @IsEnum([0, 1])
    @IsOptional()
    status?: 0 | 1;
}