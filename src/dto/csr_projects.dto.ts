import { IsNotEmpty, IsString } from 'class-validator';

export class CsrProjectsDto {
  @IsString()
  @IsNotEmpty()
  start_date: string;

  @IsString()
  @IsNotEmpty()
  end_date: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  pdf: string;
}
