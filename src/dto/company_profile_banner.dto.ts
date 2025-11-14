import { IsString } from 'class-validator';

export class AboutBannerDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  image: string;
}
