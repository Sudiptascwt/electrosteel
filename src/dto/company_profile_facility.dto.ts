import { IsEnum, IsOptional, IsString } from 'class-validator';

export class AboutFacilityDto {
  @IsString()
  meta_key: string;

  @IsString()
  meta_value: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
