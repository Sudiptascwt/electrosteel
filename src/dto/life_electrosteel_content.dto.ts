import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLifeElectrosteelContentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description: string; 
}
