import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export class EmploymentFormDto {
  @IsString()
  @IsNotEmpty({ message: 'Pdf is required' })
  pdf: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  modifiedAt?: Date;
}
