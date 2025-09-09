import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturingUnit } from '../entity/manufacturing.entity';
import { ManufacturingController } from './manufacturing_unit.controller';
import { ManufacturingService } from './manufacturing_unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturingUnit])],
  controllers: [ManufacturingController],
  providers: [ManufacturingService],
})
export class ManufacturingModule {}
