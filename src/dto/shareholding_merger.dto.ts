import { IsString, IsOptional, IsEnum } from 'class-validator';

export class ShareholderMergerDto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;
}
