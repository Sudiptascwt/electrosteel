import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class DisclosureImagesDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsInt()
  @IsOptional()
  image_id: number

  // Reference to parent dividend
  @IsNotEmpty()
  disclosure_id: number;
}
