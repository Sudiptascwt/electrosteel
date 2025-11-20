import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class UnclaimedDividendsImagesDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsInt()
  image_id: number;

  // Reference to parent dividend
  @IsNotEmpty()
  unclaimed_id: number;
}
