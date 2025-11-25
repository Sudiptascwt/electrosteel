import { IsNotEmpty, IsString, IsOptional, IsNumber, IsIn } from 'class-validator';
import { UnclaimedDividendsImagesDto } from './unclaimed_dividends_images.dto';

export class UnclaimedDividendsDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;

  @IsOptional()
  documents: UnclaimedDividendsImagesDto[];
}
