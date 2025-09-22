import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { UnclaimedDividendsImagesDto } from './unclaimed_dividends_images.dto';

export class UnclaimedDividendsDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  documents: UnclaimedDividendsImagesDto[];
}
