import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt } from 'class-validator';

export class BlogsDto {
  @IsInt()
  id: number;

  @IsNotEmpty({ message: 'category is required' })
  @IsString()
  category: string;

  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
