import { IsString, IsOptional } from 'class-validator';

export class NoticesDto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;
}
