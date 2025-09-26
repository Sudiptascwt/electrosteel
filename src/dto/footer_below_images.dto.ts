import { IsString} from 'class-validator';

export class FooterBelowImagesDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}