import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductInnovationController } from './product_innovation.controller';
import { ProductInnovationService } from './product_innovation.service';

import { ProductInnovationHeroSection } from '../../../entity/product_innovation_hero_section.entity';
import { ElectrolockJoint  } from '../../../entity/electrolock_joint.entity';
import { TrenchlessDIPipes } from '../../../entity/trenchless-di-pipes.entity';
import { PolyurethaneLining } from '../../../entity/polyurethane-lining.entity';
import { PolyurethaneCoating } from '../../../entity/polyurethane-coating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductInnovationHeroSection,
      ElectrolockJoint,
      TrenchlessDIPipes,
      PolyurethaneLining,
      PolyurethaneCoating
    ]),
  ],
  controllers: [ProductInnovationController],
  providers: [ProductInnovationService],
})
export class ProductInnovationModule {}