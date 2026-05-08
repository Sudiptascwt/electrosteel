// src/investor/dto/investor.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class InvestorDto {

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  heading: string;

  @IsString()
  @IsNotEmpty()
  ref_id: string;
  
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  src: string;

  category?: string;

  is_latest?: number;

  src_type?: string;
}