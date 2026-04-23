import { IsOptional, IsString } from 'class-validator';

export class ProductInnovationHeroSectionDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  banner: string;
}