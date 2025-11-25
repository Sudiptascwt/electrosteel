import { IsNotEmpty, IsString, IsOptional, IsInt, IsNumber, IsIn } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1]) // Only allow 0 or 1
  status?: number;
}
