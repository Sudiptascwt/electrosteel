import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class IepfSuspenseDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'PDF is required' })
  pdf: string;
}
