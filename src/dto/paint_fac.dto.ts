// src/fac/dto/create-fac.dto.ts
import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CardDto {
  @IsString()
  title: string;

  @IsString()
  desc: string;
}

export class CreateFacDto {
  @IsString()
  @IsOptional()
  title?: string; // optional if you want default from entity

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDto)
  card: CardDto[];
}