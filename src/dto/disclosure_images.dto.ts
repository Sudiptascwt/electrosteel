import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class DisclosureImagesDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  // Reference to parent dividend
  @IsNotEmpty()
  disclosure_id: number;
}
