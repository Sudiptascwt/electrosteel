import { IsString, IsOptional, IsInt } from 'class-validator';

export class DuctileIronPipesOverviewDto {
    @IsString()
    main_title: string;

    @IsString()
    sub_title: string;

    @IsString()
    properties: string;

    @IsString()
    images: string;

    @IsString()
    below_images: string;

    @IsInt()
    images_id: number;

    @IsInt()
    below_images_id: number;
}