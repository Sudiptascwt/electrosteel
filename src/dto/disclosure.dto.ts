import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { DisclosureImagesDto } from './disclosure_images.dto';

export class DisclosureDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  images: DisclosureImagesDto[];
}
