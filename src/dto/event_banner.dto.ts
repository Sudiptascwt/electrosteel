import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

export class EventBannerDto {
    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    imageFit?: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    opacity?: number;
}