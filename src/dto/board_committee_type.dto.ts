import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BoardCommitteTypeDto {
  @IsNotEmpty({ message: 'Type is required' })
  @IsString({ message: 'Type must be a string' })
  type: string;
}
