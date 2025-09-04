import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class ProductDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Page ID is required' })
  page_id: number;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1], { message: 'Status must be either 0 or 1' })
  status?: number;
}
