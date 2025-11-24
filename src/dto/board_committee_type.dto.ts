import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BoardCommitteTypeDto {
  @IsNotEmpty({ message: 'Type is required' })
  @IsString({ message: 'Type must be a string' })
  type: string;

  @IsEnum([0, 1])
  @IsOptional()
  status?: 0 | 1;
}
