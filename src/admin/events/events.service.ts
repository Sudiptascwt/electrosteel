// src/event/events.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../entity/event.entity';
import { EventDto } from '../../dto/event.dto';
import { EventBanner } from 'src/entity/event_banner.entity';
import  { EventBannerDto } from '../../dto/event_banner.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,

    @InjectRepository(EventBanner)
    private readonly EventBannerRepository: Repository<EventBanner>,
  ) {}


  async saveHero(data: EventBannerDto) {
    if (!data) {
      throw new Error("No data received");
    }
    let existingRecords = await this.EventBannerRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.image = data.image;
      recordToUpdate.imageFit = data.imageFit;
      recordToUpdate.opacity = data.opacity;
      
      const savedRecord = await this.EventBannerRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'Hero data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.EventBannerRepository.create({
        title: data.title,
        image: data.image,
        imageFit: data.imageFit,
        opacity: data.opacity
      });
      
      const savedRecord = await this.EventBannerRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Hero data created successfully.',
        data: savedRecord
      };
    }
  }

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

  async saveTopics(data: EventBannerDto) {
    if (!data) {
      throw new Error("No data received");
    }
    let existingRecords = await this.EventBannerRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.image = data.image;
      recordToUpdate.imageFit = data.imageFit;
      recordToUpdate.opacity = data.opacity;
      
      const savedRecord = await this.EventBannerRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'Hero data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.EventBannerRepository.create({
        title: data.title,
        image: data.image,
        imageFit: data.imageFit,
        opacity: data.opacity
      });
      
      const savedRecord = await this.EventBannerRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Hero data created successfully.',
        data: savedRecord
      };
    }
  }

  async getTopics() {
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

  async createBulkWithTypes(events: {
    latest?: EventDto[];
    upcoming?: EventDto[];
    handpicked?: EventDto[];
  }) {
    const allEvents: EventDto[] = [];
    
    console.log('Received data:', JSON.stringify(events, null, 2));
    
    // Add latest events
    if (events.latest && events.latest.length) {
      const latestEvents = events.latest.map(event => ({
        ...event,
        isLatest: true,
        isUpcoming: false,
        isHandpicked: false
      }));
      allEvents.push(...latestEvents);
      console.log(`Added ${latestEvents.length} latest events`);
    }
    
    // Add upcoming events
    if (events.upcoming && events.upcoming.length) {
      const upcomingEvents = events.upcoming.map(event => ({
        ...event,
        isLatest: false,
        isUpcoming: true,
        isHandpicked: false
      }));
      allEvents.push(...upcomingEvents);
      console.log(`Added ${upcomingEvents.length} upcoming events`);
    }
    
    // Add handpicked videos
    if (events.handpicked && events.handpicked.length) {
      const handpickedEvents = events.handpicked.map(event => ({
        ...event,
        isLatest: false,
        isUpcoming: false,
        isHandpicked: true
      }));
      allEvents.push(...handpickedEvents);
      console.log(`Added ${handpickedEvents.length} handpicked events`);
    }
    
    if (allEvents.length === 0) {
      throw new BadRequestException('No events provided to create');
    }
    
    return this.createBulk(allEvents);
  }

  // event.service.ts
  async createBulk(eventsDto: EventDto[]): Promise<Event[]> {
      try {
          if (!eventsDto || eventsDto.length === 0) {
              throw new BadRequestException('Events array cannot be empty');
          }
          
          // Process each event
          const processedEvents = [];
          
          for (let i = 0; i < eventsDto.length; i++) {
              const event = eventsDto[i];
              
              if (!event.title) {
                  throw new BadRequestException(`Event at index ${i} is missing title`);
              }
              
              // Convert files array to JSON string if it's an array
              if (event.files && Array.isArray(event.files)) {
                  event.files = JSON.stringify(event.files);
              }
              
              // Convert empty strings to null (optional)
              if (event.bannerTitle === "") event.bannerTitle = null;
              if (event.bannerImage === "") event.bannerImage = null;
              if (event.description === "") event.description = null;
              
              processedEvents.push(event);
          }
          
          // Create and save events
          const events = this.eventRepo.create(processedEvents);
          const savedEvents = await this.eventRepo.save(events);
          
          return savedEvents;
      } catch (error) {
          console.error('Bulk create error:', error);
          throw new BadRequestException('Failed to create bulk events: ' + error.message);
      }
  }

  // Get events by type (latest, upcoming, handpicked, or all)
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
      
      const events = await this.eventRepo.find({
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
  // Rest of your service methods...
  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepo.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async create(eventDto: EventDto): Promise<Event> {
    try {
      const event = this.eventRepo.create(eventDto);
      return await this.eventRepo.save(event);
    } catch (error) {
      throw new BadRequestException('Failed to create event: ' + error.message);
    }
  }

  async update(id: number, eventDto: EventDto): Promise<Event> {
    try {
      const event = await this.findOne(id);
      Object.assign(event, eventDto);
      return await this.eventRepo.save(event);
    } catch (error) {
      throw new BadRequestException('Failed to update event: ' + error.message);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const event = await this.findOne(id);
      await this.eventRepo.remove(event);
    } catch (error) {
      throw new BadRequestException('Failed to delete event: ' + error.message);
    }
  }

  async deleteByType(type: string): Promise<number> {
    try {
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
          throw new BadRequestException('Invalid type. Use: latest, upcoming, or handpicked');
      }
      
      const result = await this.eventRepo.delete(whereCondition);
      return result.affected || 0;
    } catch (error) {
      throw new BadRequestException('Failed to delete events: ' + error.message);
    }
  }
}