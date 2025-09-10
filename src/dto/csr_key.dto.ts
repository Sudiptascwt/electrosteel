import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CsrKeyDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  type_image: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  heading: string;

  @IsOptional()
  @IsString()
  first_list: string;

  @IsOptional()
  @IsString()
  second_list: string;

  @IsOptional()
  @IsString()
  first_image: string;

  @IsOptional()
  @IsString()
  second_image: string;

  @IsOptional()
  @IsString()
  third_image?: string;
}
