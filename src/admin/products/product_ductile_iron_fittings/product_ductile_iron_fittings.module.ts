import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDuctileIronFittingsService } from './product_ductile_iron_fittings.service';
import { ProductDuctileIronFittingsController } from './product_ductile_iron_fittings.controller';
import { DuctileIronFittingsOverview } from 'src/entity/ductile_iron_fittings_overview.entity';
import { DuctileIronFittingsDetails } from 'src/entity/ductile_iron_fittings_details.entity';
import { DuctileIronFittingsApplications } from 'src/entity/ductile_iron_fittings_application.entity';
import { FittingsPipesJointing } from 'src/entity/ductile_iron_fittings_pipe_jointing.entity';
import { FittingsPipesJointingDetails } from 'src/entity/ductile_iron_fittings_pipes_jointing_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DuctileIronFittingsOverview, DuctileIronFittingsDetails, DuctileIronFittingsApplications, FittingsPipesJointing, FittingsPipesJointingDetails])],
  controllers: [ProductDuctileIronFittingsController],
  providers: [ProductDuctileIronFittingsService],
})
export class ProductDuctileIronFittingsModule {}
