import { IsString, IsOptional } from 'class-validator';

export class PoliciesDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  pdf?: string;
}
