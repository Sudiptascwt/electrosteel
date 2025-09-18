import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class SrikalahasthiDto {

  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  name: string;
}