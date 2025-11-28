import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalPresence } from '../../entity/global_presense.entity';
import { FrontendGlobalPresenceController } from './global_presence.controller';
import { FrontendGlobalPresenceService } from './global_presence.service';
import { officeDetails } from '../../entity/office_section.entity';
import { AllOfficeDetails } from '../../entity/office_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalPresence, officeDetails, AllOfficeDetails])],
  controllers: [FrontendGlobalPresenceController],
  providers: [FrontendGlobalPresenceService],
})
export class FrontendGlobalPresenceModule {}