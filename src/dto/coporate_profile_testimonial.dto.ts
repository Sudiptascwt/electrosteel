import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class CorporateProfileTestimonialDto {
  @IsNumber()
  corporate_profile_id: number;   

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  person_name?: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
