import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from  'src/entity/event.entity';
import { EventBanner } from 'src/entity/event_banner.entity';


@Injectable()
export class FrontendEventsService {
  constructor(
    @InjectRepository(Event)
    private readonly EventsRepo: Repository<Event>,
    @InjectRepository(EventBanner)
    private readonly EventBannerRepository: Repository<EventBanner>,
  ) {}

    async getAllHero() {
    const existingData = await this.EventBannerRepository.find({});
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Hero data not found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'Hero data fetched successfully',
      data: existingData
    };
  }
// src/event/events.service.ts
    async getEventsByType(type?: string, limit: number = 50, includeHero: boolean = true) {
    let whereCondition: any = {};
    
    switch (type) {
        case 'latest':
        whereCondition = { isLatest: true };
        break;
        case 'upcoming':
        whereCondition = { isUpcoming: true };
        break;
        case 'handpicked':
        whereCondition = { isHandpicked: true };
        break;
        case 'all':
        whereCondition = {};
        break;
        default:
        whereCondition = {};
        break;
    }
    
    const [events, heroData] = await Promise.all([
        this.EventsRepo.find({
        where: whereCondition,
        order: { date: 'DESC', order: 'ASC' },
        take: limit
        }),
        includeHero ? this.getAllHero() : null
    ]);
    
    const response: any = {
        type: type || 'all',
        count: events.length,
        events
    };
    
    if (includeHero && heroData) {
        response.hero = heroData;
    }
    
    return response;
    }
}
