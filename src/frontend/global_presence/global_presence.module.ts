import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalPresence } from '../../entity/global_presense.entity';
import { FrontendGlobalPresenceController } from './global_presence.controller';
import { FrontendGlobalPresenceService } from './global_presence.service';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalPresence])],
  controllers: [FrontendGlobalPresenceController],
  providers: [FrontendGlobalPresenceService],
})
export class FrontendGlobalPresenceModule {}