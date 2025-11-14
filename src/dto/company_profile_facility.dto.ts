import { IsString } from 'class-validator';

export class AboutFacilityDto {
  @IsString()
  meta_key: string;

  @IsString()
  meta_value: string;
}
