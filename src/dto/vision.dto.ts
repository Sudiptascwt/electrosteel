import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VisionDto {
  @IsNotEmpty({ message: 'Heading is required' })
  @IsString({ message: 'Heading must be a string' })
  heading: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string' })
  image?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
