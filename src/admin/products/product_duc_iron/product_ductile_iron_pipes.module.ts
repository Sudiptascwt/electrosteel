import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDuctileIronService } from './product_ductile_iron_pipes.service';
import { ProductDuctileIronController } from './product_ductile_iron_pipes.controller';
import { DuctileIronPipeDetails } from 'src/entity/ductile_iron_pipes_details.entity';
import { DuctileIronPipesOverview } from 'src/entity/ductile_iron_pipes_overview.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DuctileIronPipeDetails,DuctileIronPipesOverview])],
  controllers: [ProductDuctileIronController],
  providers: [ProductDuctileIronService],
})
export class ProductDuctileIronModule {}
