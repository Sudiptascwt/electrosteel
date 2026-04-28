// src/investor/dto/investor.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class InvestorDto {

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  src: string;
}