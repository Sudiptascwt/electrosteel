import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNumber, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { PipeArtDetailDto } from './pipe_art_details.dto';

export class PipeArtDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsUrl({}, { message: 'Invalid URL format' })
    url?: string;

    @IsOptional()
    @IsInt()
    image_id: number

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) 
    status?: number;
    
    // optional
    // @IsOptional()
    // @ValidateNested({ each: true })
    // @Type(() => PipeArtDetailDto)
    // details?: PipeArtDetailDto[];
}
