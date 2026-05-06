import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendEventsService } from './news_room.service';

@Controller('frontend/events')
export class FrontendEventsController {
  constructor(private readonly eventService: FrontendEventsService) {}

@Get()
async getEventsByType(
  @Query('type') type?: string,
  @Query('limit') limit?: string,
  @Query('includeHero') includeHero?: string,
) {
  const limitNum = limit ? parseInt(limit, 10) : 50;
  const includeHeroBool = includeHero === 'true' || includeHero === '1';
  const data = await this.eventService.getEventsByType(type, limitNum);
  return {
    message: 'Events fetched successfully',
    data
  };
}
}
