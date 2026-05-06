// src/event/event.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EventService } from './events.service';
import { EventDto } from '../../dto/event.dto';
import { EventBannerDto } from 'src/dto/event_banner.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { UserRole } from '../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('news_room/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

    @Post('hero/save')
    async save(@Body() data: EventBannerDto) {
        return this.eventService.saveHero(data);
    }

    @Get('get-hero')
    async getAllHero() {
        return this.eventService.getAllHero();
    }

    @Post('bulk-by-type')
    async createBulkByType(@Body() body: {
        latest?: EventDto[];
        upcoming?: EventDto[];
        handpicked?: EventDto[];
    }) {
        const allEvents: EventDto[] = [];
        
        if (body.latest && body.latest.length) {
            const latestEvents = body.latest.map(event => ({
                ...event,
                isLatest: true,
                isUpcoming: false,
                isHandpicked: false
            }));
            allEvents.push(...latestEvents);
        }
        
        if (body.upcoming && body.upcoming.length) {
            const upcomingEvents = body.upcoming.map(event => ({
                ...event,
                isLatest: false,
                isUpcoming: true,
                isHandpicked: false
            }));
            allEvents.push(...upcomingEvents);
        }
        
        if (body.handpicked && body.handpicked.length) {
            const handpickedEvents = body.handpicked.map(event => ({
                ...event,
                isLatest: false,
                isUpcoming: false,
                isHandpicked: true
            }));
            allEvents.push(...handpickedEvents);
        }
        
        if (allEvents.length === 0) {
            return {
                message: 'No events provided to create',
                statusCode: 400
            };
        }
        
        const data = await this.eventService.createBulk(allEvents);
        
        return {
            message: `${data.length} events created successfully`,
            summary: {
                total: data.length,
                latest: body.latest?.length || 0,
                upcoming: body.upcoming?.length || 0,
                handpicked: body.handpicked?.length || 0
            },
            data
        };
    }

    @Post('topics/save')
    async saveTopics(@Body() data: EventBannerDto) {
        return this.eventService.saveTopics(data);
    }

    @Get('get-topics')
    async getTopics() {
        return this.eventService.getTopics();
    }

    @Post('bulk')
    async createBulk(@Body() events: EventDto[]) {
        const data = await this.eventService.createBulk(events);
        return {
            message: `${data.length} events created successfully`,
            summary: {
                total: data.length,
                latest: data.filter(e => e.isLatest).length,
                upcoming: data.filter(e => e.isUpcoming).length,
                handpicked: data.filter(e => e.isHandpicked).length
            },
            data
        };
    }

    @Get()
    async getEventsByType(
        @Query('type') type?: string,
        @Query('limit') limit?: string,
    ) {
        const limitNum = limit ? parseInt(limit, 10) : 50; // Fixed: base 10, not 50
        const data = await this.eventService.getEventsByType(type, limitNum);
        return {
            message: 'Events fetched successfully',
            data
        };
    }

    // Get single event
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const data = await this.eventService.findOne(id);
        return {
        message: 'Event fetched successfully',
        data
        };
    }

    // Create single event
    @Post()
    async create(@Body() eventDto: EventDto) {
        const data = await this.eventService.create(eventDto);
        return {
        message: 'Event created successfully',
        data
        };
    }

    // Update event
    @Post('update-event/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() eventDto: EventDto,
    ) {
        const data = await this.eventService.update(id, eventDto);
        return {
        message: 'Event updated successfully',
        data
        };
    }

    // Delete event
    @Post('delete/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.eventService.delete(id);
        return {
        message: 'Event deleted successfully'
        };
    }

    // Delete by type
    @Post('delete-type/:type')
    async deleteByType(@Param('type') type: string) {
        const count = await this.eventService.deleteByType(type);
        return {
        message: `${count} events deleted successfully`,
        deletedCount: count
        };
    }
}