import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regulation } from '../../../entity/regulation.entity';
import { RegulationController } from './regulation_37.controller';
import { RegulationService } from './regulation_37.service';

@Module({
  imports: [TypeOrmModule.forFeature([Regulation])],
  controllers: [RegulationController],
  providers: [RegulationService],
})
export class RegulationModule {}
