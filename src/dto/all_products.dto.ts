import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt, IsEnum, IsObject, IsArray } from 'class-validator';
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

    @IsString()
    video_link: string;

    @IsObject()
    @IsOptional()
    table_headers?: any;

    // Accept array for table_data
    @IsArray()
    @IsOptional()
    table_data?: any[];

    @IsArray()
    @IsOptional()
    table_data2?: any[];
}
