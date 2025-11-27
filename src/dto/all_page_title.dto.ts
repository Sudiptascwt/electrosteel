import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt, IsEnum } from 'class-validator';

export class AllPagesTitleDto {

  @IsString()
  page_name?: string;

  @IsString()
  name1?: string;

  @IsString()
  name2: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}