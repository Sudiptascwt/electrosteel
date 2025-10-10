import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDuctileIronFittingsService } from './product_ductile_iron_fittings.service';
import { ProductDuctileIronFittingsController } from './product_ductile_iron_fittings.controller';
import { DuctileIronFittingsOverview } from 'src/entity/ductile_iron_fittings_overview.entity';
import { DuctileIronFittingsDetails } from 'src/entity/ductile_iron_fittings_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DuctileIronFittingsOverview, DuctileIronFittingsDetails])],
  controllers: [ProductDuctileIronFittingsController],
  providers: [ProductDuctileIronFittingsService],
})
export class ProductDuctileIronFittingsModule {}
