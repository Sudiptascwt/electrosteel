import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutFacility } from '../../../../entity/company_profile_facility.entity';
import { AboutFacilityService } from './about_facility.service';
import { AboutFacilityController } from './about_facility.controller';
import { FacilityName } from 'src/entity/facility_name.entity';
@Module({
    imports: [TypeOrmModule.forFeature([AboutFacility, FacilityName])],
    controllers: [AboutFacilityController],
    providers: [AboutFacilityService],
})
export class AboutFacilityModule {}
