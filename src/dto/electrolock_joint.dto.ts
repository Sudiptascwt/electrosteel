import { IsOptional, IsString } from 'class-validator';

export class ElectrolockJointDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  downloadLink: string;

  @IsOptional()
  @IsString()
  videoLink: string;

  @IsOptional()
  @IsString()
  faqLink: string;
}