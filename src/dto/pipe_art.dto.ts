import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
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
    
    // optional
    // @IsOptional()
    // @ValidateNested({ each: true })
    // @Type(() => PipeArtDetailDto)
    // details?: PipeArtDetailDto[];
}
