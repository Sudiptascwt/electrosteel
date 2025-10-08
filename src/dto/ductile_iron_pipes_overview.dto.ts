import { IsString, IsOptional } from 'class-validator';

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
}