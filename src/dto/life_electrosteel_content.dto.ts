import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
