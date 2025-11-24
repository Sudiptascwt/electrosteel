import { IsEnum, IsOptional, IsString} from 'class-validator';

export class FooterBelowImagesDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}