import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { overViewController } from './overview_section.controller'
import { overViewService } from './overview_section.service';
import { OverviewSection } from 'src/entity/overview_section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OverviewSection])],
  controllers: [overViewController],
  providers: [overViewService],
  exports: [overViewService],
})
export class overViewModule {}