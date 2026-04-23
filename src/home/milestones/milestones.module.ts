import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MilestonesController } from './milestones.controller'
import { MilestonesService } from './milestones.service';
import { Milestone } from '../../entity/milestones.entity';
import { headings } from '../../entity/headings.entity';
import { MilestoneBanner } from 'src/entity/milestone_banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Milestone, headings, MilestoneBanner])],
  controllers: [MilestonesController],
  providers: [MilestonesService],
  exports: [MilestonesService],
})
export class milestonesModule {}