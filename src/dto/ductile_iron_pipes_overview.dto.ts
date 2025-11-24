import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

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

    @IsEnum([0, 1])
    @IsOptional()
    status?: 0 | 1;
}