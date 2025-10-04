import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendNcltMeetingsService } from './nclt_meetings.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/nclt-meetings')
export class FrontendNcltMeetingsController {
  constructor(private readonly NcltMeetingsService: FrontendNcltMeetingsService) {}

  @Get()
  async getNcltMeetingsData() {
    return this.NcltMeetingsService.getNcltMeetingsData();
  }
}
