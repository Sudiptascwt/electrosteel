import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class CompanyDetailsDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Page ID is required' })
  page_id: number;

  @IsOptional()
  @IsString()
  image?: string; 

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1], { message: 'Status must be 0 or 1' })
  status?: number;
}
