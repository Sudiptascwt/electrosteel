import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OthersService } from './other_products.service';
import { OthersController } from './other_products.controller';
import { DuctileIronFittingsOverview } from 'src/entity/ductile_iron_fittings_overview.entity';
import { DuctileIronFittingsDetails } from 'src/entity/ductile_iron_fittings_details.entity';
import { DuctileIronFittingsApplications } from 'src/entity/ductile_iron_fittings_application.entity';
import { FittingsPipesJointing } from 'src/entity/ductile_iron_fittings_pipe_jointing.entity';
import { FittingsPipesJointingDetails } from 'src/entity/ductile_iron_fittings_pipes_jointing_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DuctileIronFittingsOverview, DuctileIronFittingsDetails, DuctileIronFittingsApplications, FittingsPipesJointing, FittingsPipesJointingDetails])],
  controllers: [OthersController],
  providers: [OthersService],
})
export class OthersModule {}
