import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt, IsEnum } from 'class-validator';

export class BoardCommitteDataDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  rows?: string;
}
