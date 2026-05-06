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
    async getEventsByType(type?: string, limit: number = 50) {
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
            default:
                whereCondition = {};
                break;
        }
        
        const events = await this.EventsRepo.find({
            where: whereCondition,
            order: { date: 'DESC', order: 'ASC' },
            take: limit
        });

        const parsedEvents = events.map(event => {
            const parsedEvent = { ...event }; 
            
            if (parsedEvent.files && typeof parsedEvent.files === 'string') {
                try {
                    parsedEvent.files = JSON.parse(parsedEvent.files);
                } catch (e) {
                    console.warn(`Failed to parse files for event ID ${event.id}:`, e);
                }
            } else if (!parsedEvent.files) {
              console.warn(`Failed to parse files for event ID ${event.id}:`);
            }
            
            return parsedEvent;
        });
        
        return {
            type: type || 'all',
            count: parsedEvents.length,
            events: parsedEvents  // files will be array here
        };
    }
}
