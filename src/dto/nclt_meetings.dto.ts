import { IsString, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class NcltMeetingDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'pdf is required' })
  @IsString()
  pdf: string;
}