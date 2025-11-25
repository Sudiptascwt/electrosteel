import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class SrikalahasthiDto {

  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}