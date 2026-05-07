import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
export class CommonTitleDto {
  @IsString()
  title: string;

  @IsString()
  sub_title: string;

  @IsString()
  category: string;

  @IsString()
  description: string;
}