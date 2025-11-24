import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsEnum } from 'class-validator';

export class  TestimonialDto {

  // @IsString()
  // @IsNotEmpty({ message: 'Title is required' })
  // title: string;

  // @IsString()
  // @IsOptional()
  // sub_title: string;

  // @IsString()
  // @IsOptional()
  // year: string;

  // @IsString()
  // @IsOptional()
  // image: string;

  // @IsString()
  // @IsOptional()
  // description: string;

  // @IsOptional()
  // @IsNumber()
  // @IsIn([0, 1], { message: 'Status must be either 0 or 1' })
  // status?: number;
  @IsString()
  meta_key: string;

  @IsString()
  @IsOptional()
  meta_value: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1; 
}
