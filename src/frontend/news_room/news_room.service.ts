import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/entity/event.entity';
import { EventBanner } from 'src/entity/event_banner.entity';

export interface EventFile {
    url: string;
    name: string;
    size?: number;
    type?: string;
}

export interface ParsedEvent {
    id: number;
    category: string;
    title: string;
    slug: string;
    date: string;
    time: string;
    location: string;
    image: string;
    files: EventFile[];
    video: string;
    bannerTitle: string;
    bannerImage: string;
    description: string;
    isLatest: boolean;
    isUpcoming: boolean;
    isHandpicked: boolean;
    order: number;
    created_at: Date;
    updated_at: Date;
}

@Injectable()
export class FrontendEventsService {
    constructor(
        @InjectRepository(Event)
        private readonly EventsRepo: Repository<Event>,
        @InjectRepository(EventBanner)
        private readonly EventBannerRepository: Repository<EventBanner>,
    ) {}

    async getAllHero() {
        try {
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
        } catch (error) {
            throw new BadRequestException(`Failed to fetch hero data: ${error.message}`);
        }
    }

    async getEventsByType(type?: string, limit: number = 50) {
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
                    whereCondition = {};
                    break;
            }
            
            const events = await this.EventsRepo.find({
                where: whereCondition,
                order: { date: 'DESC', order: 'ASC' },
                take: limit
            });

            const parsedEvents: ParsedEvent[] = events.map(event => {
                let parsedFiles: EventFile[] = [];
                
                if (event.files && typeof event.files === 'string') {
                    try {
                        parsedFiles = JSON.parse(event.files);
                    } catch (e) {
                        console.warn(`Failed to parse files for event ID ${event.id}:`, e);
                        parsedFiles = [];
                    }
                } else if (event.files && Array.isArray(event.files)) {
                    parsedFiles = event.files;
                }
                
                return {
                    id: event.id,
                    category: event.category,
                    title: event.title,
                    slug: event.slug,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    image: event.image,
                    video: event.video,
                    bannerTitle: event.bannerTitle,
                    bannerImage: event.bannerImage,
                    description: event.description,
                    isLatest: event.isLatest,
                    isUpcoming: event.isUpcoming,
                    isHandpicked: event.isHandpicked,
                    order: event.order,
                    created_at: event.created_at,
                    updated_at: event.updated_at,
                    files: parsedFiles
                };
            });
            
            return {
                status: true,
                statusCode: 200,
                message: 'Events fetched successfully',
                type: type || 'all',
                count: parsedEvents.length,
                events: parsedEvents
            };
        } catch (error) {
            throw new BadRequestException(`Failed to fetch events: ${error.message}`);
        }
    }

    async getEventBySlug(slug: string) {
        try {
            const event = await this.EventsRepo.findOne({
                where: { slug: slug }
            });

            if (!event) {
                throw new NotFoundException(`Event with slug "${slug}" not found`);
            }

            let parsedFiles: EventFile[] = [];
            
            if (event.files && typeof event.files === 'string') {
                try {
                    parsedFiles = JSON.parse(event.files);
                } catch (e) {
                    console.warn(`Failed to parse files for event ID ${event.id}:`, e);
                    parsedFiles = [];
                }
            } else if (event.files && Array.isArray(event.files)) {
                parsedFiles = event.files;
            }

            const parsedEvent: ParsedEvent = {
                id: event.id,
                category: event.category,
                title: event.title,
                slug: event.slug,
                date: event.date,
                time: event.time,
                location: event.location,
                image: event.image,
                video: event.video,
                bannerTitle: event.bannerTitle,
                bannerImage: event.bannerImage,
                description: event.description,
                isLatest: event.isLatest,
                isUpcoming: event.isUpcoming,
                isHandpicked: event.isHandpicked,
                order: event.order,
                created_at: event.created_at,
                updated_at: event.updated_at,
                files: parsedFiles
            };
            
            return {
                status: true,
                statusCode: 200,
                message: 'Event fetched successfully',
                event: parsedEvent
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException(`Failed to fetch event: ${error.message}`);
        }
    }
}