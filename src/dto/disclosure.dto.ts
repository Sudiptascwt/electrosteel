import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { DisclosureImagesDto } from './disclosure_images.dto';

export class DisclosureDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;

  @IsOptional()
  images: DisclosureImagesDto[];
}
