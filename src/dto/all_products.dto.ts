import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt, IsEnum } from 'class-validator';
export class AllProductsDto {

    @IsString()
    category?: string;

    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsString()
    image: string;

    @IsString()
    slider_images: string;

    @IsString()
    url: string;

    @IsString()
    download_link: string;
}