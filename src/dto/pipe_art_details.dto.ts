import { IsNotEmpty, IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

export class PipeArtDetailDto {
    @IsNotEmpty({ message: 'Pipe ID is required' })
    @IsNumber()
    pipe_id: number; // Foreign key reference to PipeArt.id

    @IsOptional()
    @IsString()
    heading_image?: string;

    @IsOptional()
    @IsString()
    caption?: string;

    @IsOptional()
    @IsString()
    content_image?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    add_image?: string;

    @IsOptional()
    @IsString()
    left_image?: string;

    @IsOptional()
    @IsString()
    right_image?: string;

    @IsOptional()
    @IsNumber()
    @IsIn([0, 1]) 
    status?: number;
}
