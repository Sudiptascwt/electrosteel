import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  { ProcessInnovationHero } from '../../../entity/process_innovation_hero.entity'
import {process_innovationService } from './process_innovation.service';
import {process_innovationController } from './process_innovation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessInnovationHero])],
  providers: [process_innovationService],
  controllers: [process_innovationController],
})
export class process_innovationModule {}
