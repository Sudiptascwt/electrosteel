import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DuctileIronFittingsController } from './ductile_iron_fitting.controller';
import { DuctileIronFittingsService } from './ductile_iron_fitting.service';

// Entities
import { Overview } from '../../../entity/ductile_iron_fitting_overview.entity';
import { WhyChoose } from '../../../entity/ductile_iron_fitting_why_choose.entity';
import { WhyChooseList } from '../../../entity/ductile_iron_fitting_why_choose_list.entity';
import { DuctileIronFittingsProductDetails } from '../../../entity/ductile_iron_fitting_product_details.entity';
import { ProductDetailsStandard } from '../../../entity/ductile_iron_fitting_product_details_standard.entity';
import { FittingsRange } from '../../../entity/ductile_iron_fitting_fittings_range.entity';
import { FittingsRangeItem } from '../../../entity/ductile_iron_fitting_fittings_range_item.entity';
import { DuctileIronFittingsApplication } from '../../../entity/ductile_iron_fitting_application.entity';
import { ApplicationColumn } from '../../../entity/ductile_iron_fitting_application_column.entity';
import { ApplicationItem } from '../../../entity/ductile_iron_fitting_application_item.entity';
import { JointingSystem } from '../../../entity/ductile_iron_fitting_jointing_system.entity';
import { DuctileIronFittingsProtectionInternal } from '../../../entity/ductile_iron_fitting_protection_internal.entity';
import { ProtectionInternalItem } from '../../../entity/ductile_iron_fitting_protection_internal_item.entity';
import { ProtectionInternalModal } from '../../../entity/ductile_iron_fitting_protection_internal_modal.entity';
import { DuctileIronFittingsProtectionExternal } from '../../../entity/ductile_iron_fitting_protection_external.entity';
import { ProtectionExternalItem } from '../../../entity/ductile_iron_fitting_protection_external_item.entity';
import { ProtectionExternalModal } from '../../../entity/ductile_iron_fitting_protection_external_modal.entity';
import { CardSection } from '../../../entity/ductile_iron_fitting_card_section.entity';

const featureEntities = [
  Overview,
  WhyChoose,
  WhyChooseList,
  DuctileIronFittingsProductDetails,
  ProductDetailsStandard,
  FittingsRange,
  FittingsRangeItem,
  DuctileIronFittingsApplication,
  ApplicationColumn,
  ApplicationItem,
  JointingSystem,
  DuctileIronFittingsProtectionInternal,
  ProtectionInternalItem,
  ProtectionInternalModal,
  DuctileIronFittingsProtectionExternal,
  ProtectionExternalItem,
  ProtectionExternalModal,
  CardSection,
];

@Module({
  imports: [TypeOrmModule.forFeature(featureEntities)],
  controllers: [DuctileIronFittingsController],
  providers: [DuctileIronFittingsService],
  exports: [DuctileIronFittingsService],
})
export class DuctileIronFittingsModule {}