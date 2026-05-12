import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DuctileIronFittingController } from './ductile_iron_fitting.controller';
import { DuctileIronFittingService } from './ductile_iron_fitting.service';

// Entities
import { OverviewDuctileIronPipes } from '../../../entity/overview.entity';
import { ProductDetails } from '../../../entity/product-details.entity';
import { Application } from '../../../entity/application.entity';
import { JointingSystems } from '../../../entity/jointing-systems.entity';
import { ProtectionInternal } from '../../../entity/protection-internal.entity';
import { ProtectionExternal } from '../../../entity/protection-external.entity';


const featureEntities = [
  OverviewDuctileIronPipes,
  ProductDetails,
  Application,
  JointingSystems,
  ProtectionInternal,
  ProtectionExternal
];

@Module({
  imports: [TypeOrmModule.forFeature(featureEntities)],
  controllers: [DuctileIronFittingController],
  providers: [DuctileIronFittingService],
  exports: [DuctileIronFittingService],
})
export class DuctileIronFittingsModule {}