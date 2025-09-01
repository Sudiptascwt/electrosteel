import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export class AdvancementDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string; // changed from number to string

  @IsNotEmpty({ message: 'Image is required' })
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  pdf?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  link?: string;

  // @IsEnum(['0', '1'])
  // @IsOptional()
  // status?: '0' | '1';
  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;  
}

