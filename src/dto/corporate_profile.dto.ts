import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CorporateProfileTestimonialDto } from './coporate_profile_testimonial.dto';

export class  CorporateProfileDto {
  @IsOptional()
  @IsString()
  name1: string;

  @IsOptional()
  @IsString()
  name2: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  heading: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CorporateProfileTestimonialDto)
  testimonials?: CorporateProfileTestimonialDto[];
}

