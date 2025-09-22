import { IsString, IsOptional } from 'class-validator';

export class Notices160Dto {
  @IsString()
  title: string;

  @IsString()
  pdf: string;
}
