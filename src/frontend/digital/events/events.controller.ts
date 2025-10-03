import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendEventsService } from './events.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/digital/events')
export class FrontendEventsController {
  constructor(private readonly EventsService: FrontendEventsService) {}

  //get overseas Events data
  @Get()
  async getEventsData() {
    return this.EventsService.getEventsData();
  }
}
