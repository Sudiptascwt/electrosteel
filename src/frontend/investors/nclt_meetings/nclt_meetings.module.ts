import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendNcltMeetingsController } from './nclt_meetings.controller';
import { FrontendNcltMeetingsService } from './nclt_meetings.service';
import { NcltMeeting } from 'src/entity/nclt_meetings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NcltMeeting])],
  controllers: [FrontendNcltMeetingsController],
  providers: [FrontendNcltMeetingsService],
})
export class FrontendNcltMeetingsModule {}
