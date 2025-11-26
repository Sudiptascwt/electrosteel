import { IsEnum, IsOptional, IsString } from 'class-validator';

export class AboutFacilityDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  features: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
