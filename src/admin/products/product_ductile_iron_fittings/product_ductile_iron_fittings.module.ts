import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDuctileIronFittingsService } from './product_ductile_iron_fittings.service';
import { ProductDuctileIronFittingsController } from './product_ductile_iron_fittings.controller';
import { DuctileIronPipeDetails } from 'src/entity/ductile_iron_pipes_details.entity';
import { DuctileIronPipesOverview } from 'src/entity/ductile_iron_pipes_overview.entity';
import { DuctileIronPipeApplications } from 'src/entity/ductile_iron_pipes_application.entity';
import { PipesJointing } from 'src/entity/pipes_jointing.entity';
import { PipesJointingDetails } from 'src/entity/pipes_jointing_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DuctileIronPipeDetails,DuctileIronPipesOverview, DuctileIronPipeApplications, PipesJointing, PipesJointingDetails])],
  controllers: [ProductDuctileIronFittingsController],
  providers: [ProductDuctileIronFittingsService],
})
export class ProductDuctileIronFittingsModule {}
