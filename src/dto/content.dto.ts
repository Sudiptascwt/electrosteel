import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsInt()
  image_id: number;
  
  @IsOptional()
  @IsString()
  description: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
