import { IsIn, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
