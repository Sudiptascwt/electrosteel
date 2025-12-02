import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn, IsInt } from 'class-validator';

export class VideoSectionDto {

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  sub_title: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  url?: string;
  
  @IsOptional()
  @IsNumber()
  @IsIn([0, 1], { message: 'Status must be either 0 or 1' })
  status?: number;
}
