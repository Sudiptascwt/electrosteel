import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class EmploymentFormDto {
  @IsString()
  @IsNotEmpty({ message: 'Pdf is required' })
  pdf: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  modifiedAt?: Date;
}
