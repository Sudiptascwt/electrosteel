import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class SectionElectrosteelDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Page ID is required' })
  page_id: number;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString()
  image?: string; 

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
