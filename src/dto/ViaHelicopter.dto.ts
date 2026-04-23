import { IsString, IsOptional, IsInt, IsNumber, IsIn } from 'class-validator';

export class ViaHelicopterDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  video_link: string;

}
