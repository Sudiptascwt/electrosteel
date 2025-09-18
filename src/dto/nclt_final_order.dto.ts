import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class NcltFinalOrderDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'pdf is required' })
  @IsString()
  pdf: string;
}