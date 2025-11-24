import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

export class LatestElectrosteelDto {
  @IsString()
  page_meta_key: string;

  @IsString()
  page_meta_value: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
