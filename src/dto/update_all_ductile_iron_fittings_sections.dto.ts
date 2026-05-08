import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { DuctileIronFittingOverviewDto } from './ductile_iron_fitting_overview.dto';
import { DuctileIronFittingWhyChooseDto } from './ductile_iron_fitting_why_choose.dto';
import { DuctileIronFittingProductDetailsDto } from './ductile_iron_fitting_product_details.dto';
import { DuctileIronFittingFittingsRangeDto } from './ductile_iron_fitting_fittings_range.dto';
import { DuctileIronFittingApplicationDto } from './ductile_iron_fitting_application.dto';
import { DuctileIronFittingJointingSystemDto } from './ductile_iron_fitting_jointing_system.dto';
import { DuctileIronFittingProtectionInternalDto } from './ductile_iron_fitting_protection_internal.dto';
import { DuctileIronFittingProtectionExternalDto } from './ductile_iron_fitting_protection_external.dto';
import { DuctileIronFittingCardSectionDto } from './ductile_iron_fitting_card_section.dto';
export class UpdateAllDuctileIronFittingsSectionsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => DuctileIronFittingOverviewDto)
  overview?: DuctileIronFittingOverviewDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DuctileIronFittingWhyChooseDto)
  why_choose?: DuctileIronFittingWhyChooseDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DuctileIronFittingProductDetailsDto)
  product_details?: DuctileIronFittingProductDetailsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DuctileIronFittingFittingsRangeDto)
  fittings_range?: DuctileIronFittingFittingsRangeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DuctileIronFittingApplicationDto)
  application?: DuctileIronFittingApplicationDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingJointingSystemDto)
  jointing_systems?: DuctileIronFittingJointingSystemDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DuctileIronFittingProtectionInternalDto)
  protection_internal?: DuctileIronFittingProtectionInternalDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DuctileIronFittingProtectionExternalDto)
  protection_external?: DuctileIronFittingProtectionExternalDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DuctileIronFittingCardSectionDto)
  card_sections?: DuctileIronFittingCardSectionDto[];
}