import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt, IsEnum } from 'class-validator';

export class BlogsDto {
  @IsInt()
  id: number;

  @IsNotEmpty({ message: 'category is required' })
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
