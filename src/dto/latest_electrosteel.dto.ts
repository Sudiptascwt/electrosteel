import { IsString, IsOptional } from 'class-validator';

export class LatestElectrosteelDto {
  @IsString()
  page_meta_key: string;

  @IsString()
  page_meta_value: string;
}
