import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { milestonesController } from './milestones.controller'
import { MilestonesService } from './milestones.service';
import { Milestone } from '../../entity/milestones.entity';
import { headings } from '../../entity/headings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Milestone, headings])],
  controllers: [milestonesController],
  providers: [MilestonesService],
  exports: [MilestonesService],
})
export class milestonesModule {}