import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt } from 'class-validator';

export class SectionElectrosteelDto {

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString()
  image?: string; 
  
  @IsInt()
  image_id?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  qualities?: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1], { message: 'Status must be 0 or 1' })
  status?: number;
}
