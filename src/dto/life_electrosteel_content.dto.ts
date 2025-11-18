import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLifeElectrosteelContentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsInt()
  image_id: number;

  @IsOptional()
  @IsString()
  description: string; 
}
