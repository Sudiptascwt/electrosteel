import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BoardCommitteDetailsDto {
  // @IsNotEmpty({ message: 'board_id is required' })
  // @IsString({ message: 'board_id must be a string' })
  // board_id: number;
  @IsNumber()
  board_id: number;   // FK from frontend

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  position: string;
}
