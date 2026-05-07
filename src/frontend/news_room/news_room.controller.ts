import {
  Controller,
  Get,
  Param,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { FrontendEventsService, ParsedEvent } from './news_room.service';

@Controller('frontend/events')
export class FrontendEventsController {
  constructor(private readonly eventService: FrontendEventsService) {}

  @Get('hero')
  async getHero() {
    const data = await this.eventService.getAllHero();
    return {
      statusCode: HttpStatus.OK,
      message: 'Hero data fetched successfully',
      data,
    };
  }

  @Get()
  async getEventsByType(
    @Query('type') type?: string,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 50;
    const data = await this.eventService.getEventsByType(type, limitNum);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Events fetched successfully',
      data,
    };
  }

  @Get('slug/:slug')
  async getEventBySlug(@Param('slug') slug: string): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: {
      status: boolean;
      statusCode: number;
      message: string;
      event: ParsedEvent;
    };
  }> {
    const data = await this.eventService.getEventBySlug(slug);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Event fetched successfully',
      data,
    };
  }
}