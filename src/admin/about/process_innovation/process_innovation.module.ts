import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  { ProcessInnovationHero } from '../../../entity/process_innovation_hero.entity'
import {process_innovationService } from './process_innovation.service';
import {process_innovationController } from './process_innovation.controller';
import { PipesToInhospitableKargil } from '../../../entity/pipes_to_inhospitable_kargil.entity';
import { ElectrosteelIsro } from '../../../entity/electrosteel_isro.entity';
import { ReachingStars } from '../../../entity/ReachingStars.entity';
import { UltimateDIPipes } from '../../../entity/UltimateDIPipes.entity';
import { ViaHelicopter } from '../../../entity/ViaHelicopter.entity';
import { changiWater } from '../../../entity/changiWater.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessInnovationHero, PipesToInhospitableKargil, ElectrosteelIsro, ReachingStars, UltimateDIPipes, ViaHelicopter, changiWater])],
  providers: [process_innovationService],
  controllers: [process_innovationController],
})
export class process_innovationModule {}
