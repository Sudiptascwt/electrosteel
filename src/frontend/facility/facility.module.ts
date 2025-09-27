import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from '../../entity/facility.entity';
import { FrontendFacilityController } from './facility.controller';
import { FrontendFacilityService } from './facility.service';

@Module({
  imports: [TypeOrmModule.forFeature([Facility])],
  controllers: [FrontendFacilityController],
  providers: [FrontendFacilityService],
})
export class FrontendFacilityModule {}
