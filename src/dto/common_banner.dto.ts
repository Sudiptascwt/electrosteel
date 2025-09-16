import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
export class CommonBannerDto {
  @IsNotEmpty({ message: 'page name is required' })
  @IsString()
  page_name: string;

  @IsString()
  meta_key: string;

  @IsString()
  meta_value: string;
}
