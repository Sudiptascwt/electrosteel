import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VisionDto {
  @IsNotEmpty({ message: 'Heading is required' })
  @IsString({ message: 'Heading must be a string' })
  heading: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string' })
  image?: string;

  @IsOptional()
  @IsInt()
  image_id?: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
