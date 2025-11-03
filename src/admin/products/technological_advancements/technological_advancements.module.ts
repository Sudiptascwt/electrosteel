import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnologicalAdvancementsService } from './technological_advancements.service';
import { TechnologicalAdvancementsController } from './technological_advancements.controller';
import { product_applications } from '../../../entity/product_application.entity';


@Module({
  imports: [TypeOrmModule.forFeature([product_applications])],
  controllers: [TechnologicalAdvancementsController],
  providers: [TechnologicalAdvancementsService],
})
export class TechnologicalAdvancementsModule {}
 