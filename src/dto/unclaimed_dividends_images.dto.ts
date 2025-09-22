import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UnclaimedDividendsImagesDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  // Reference to parent dividend
  @IsNotEmpty()
  unclaimed_id: number;
}
