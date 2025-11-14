import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutFacility } from '../../../../entity/company_profile_facility.entity';
import { AboutFacilityService } from './about_facility.service';
import { AboutFacilityController } from './about_facility.controller';
@Module({
    imports: [TypeOrmModule.forFeature([AboutFacility])],
    controllers: [AboutFacilityController],
    providers: [AboutFacilityService],
})
export class AboutFacilityModule {}
