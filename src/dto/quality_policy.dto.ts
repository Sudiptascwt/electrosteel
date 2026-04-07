import { IsString, IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Pdf is required' })
  pdf: string;
}
