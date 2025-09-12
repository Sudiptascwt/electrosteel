import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SubsidiariesPageDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  banner_image?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;
}
