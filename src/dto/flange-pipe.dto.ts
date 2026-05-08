// import { IsOptional, IsString, IsNumber, IsBoolean, Min, IsArray, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';
// import { PartialType } from '@nestjs/swagger';
// import { FlangePipe } from 'src/entity/flange-pipe.entity';

// export class CreateFlangePipeDto {
//   @IsOptional()
//   @IsString()
//   dn?: string;

//   @IsOptional()
//   @IsString()
//   external_dia?: string;

//   @IsOptional()
//   @IsString()
//   tolerance_de?: string;

//   @IsOptional()
//   @IsString()
//   pressure_class?: string;

//   @IsOptional()
//   @IsString()
//   thickness_class?: string;

//   @IsOptional()
//   @IsString()
//   flange_type?: string;

//   @IsOptional()
//   @IsNumber()
//   @Min(0)
//   sort_order?: number;

//   @IsOptional()
//   @IsBoolean()
//   is_active?: boolean;
// }

// export class UpdateFlangePipeDto extends PartialType(CreateFlangePipeDto) {}

// export class FlangeTableDto {
//   @IsOptional()
//   tableLabel: string;

//   @IsOptional()
//   tableNote: string;

//   @IsOptional()
//   headerTop: Array<{
//     label: string;
//     colSpan: number;
//   }>;

//   @IsOptional()
//   tableData: FlangePipe[];
// }

// export class BulkCreateFlangePipeDto {
//   @IsOptional()
//   @IsString()
//   tableLabel?: string;

//   @IsOptional()
//   @IsString()
//   tableNote?: string;

//   @IsOptional()
//   headerTop?: Array<{
//     label: string;
//     colSpan: number;
//   }>;

//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreateFlangePipeDto)
//   tableData: CreateFlangePipeDto[];
// }

import { IsOptional, IsString, IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TableDataItemDto {
  @IsOptional()
  @IsString()
  dn?: string;

  @IsOptional()
  @IsString()
  external_dia?: string;

  @IsOptional()
  @IsString()
  tolerance_de?: string;

  @IsOptional()
  @IsString()
  pressure_class?: string;

  @IsOptional()
  @IsString()
  thickness_class?: string;

  @IsOptional()
  @IsString()
  flange_type?: string;

  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class HeaderTopDto {
  @IsString()
  label: string;

  @IsNumber()
  colSpan: number;
}

export class ApplicationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class AdvantageDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  desc?: string;
}

export class CreateFlangePipeDto {
  @IsOptional()
  @IsString()
  dn?: string;

  @IsOptional()
  @IsString()
  external_dia?: string;

  @IsOptional()
  @IsString()
  tolerance_de?: string;

  @IsOptional()
  @IsString()
  pressure_class?: string;

  @IsOptional()
  @IsString()
  thickness_class?: string;

  @IsOptional()
  @IsString()
  flange_type?: string;

  @IsOptional()
  @IsNumber()
  sort_order?: number;
}

export class BulkCreateFlangePipeDto {
  @IsOptional()
  @IsString()
  tableLabel?: string;

  @IsOptional()
  @IsString()
  tableNote?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeaderTopDto)
  headerTop?: HeaderTopDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TableDataItemDto)
  tableData: TableDataItemDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ApplicationDto)
  application?: ApplicationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdvantageDto)
  advantage?: AdvantageDto;
}

export class UpdateFlangeContentDto {
  @IsOptional()
  @IsString()
  tableLabel?: string;

  @IsOptional()
  @IsString()
  tableNote?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ApplicationDto)
  application?: ApplicationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdvantageDto)
  advantage?: AdvantageDto;
}