import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VisionDto {

  @IsNotEmpty({ message: 'Heading is required' })
  @IsString({ message: 'Heading must be a string' })
  heading: string;

  @IsNotEmpty({ message: 'Name1 is required' })
  @IsString({ message: 'Name1 must be a string' })
  name1: string;

  @IsNotEmpty({ message: 'Name2 is required' })
  @IsString({ message: 'Name2 must be a string' })
  name2: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string' })
  image?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  principle_title_name1?: string;

  @IsOptional()
  principle_title_name2?: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
