import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class DirectorsDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  profile_image?: string;

  @IsNotEmpty({ message: 'URL is required' })
  @IsUrl({}, { message: 'Please enter a valid URL' })
  url: string;
}
