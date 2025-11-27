import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt, IsEnum } from 'class-validator';

export class BoardCommitteTitleDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  name1?: string;

  @IsOptional()
  @IsString()
  name2?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
