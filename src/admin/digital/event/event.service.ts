import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../entity/event.entity';
import { EventDto } from '../../../dto/event.dto';
@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly EventRepository: Repository<Event>,
    ) {}
    

    // CREATE
    async create(createDto: EventDto) {
        try {
        const newEvent = this.EventRepository.create(createDto);
        const savedEvent = await this.EventRepository.save(newEvent);

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            message: 'Event created successfully',
            data: savedEvent,
        };
        } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while creating Event',
            error: error.message,
        };
        }
  }

    // GET ALL
    async findAll() {
        const data = await this.EventRepository.find();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: data.length > 0 ? 'Events fetched successfully' : 'No Event found',
            data,
        };
    }

    // GET BY ID
    async findById(id: number) {
        const About = await this.EventRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Event with ID ${id} not found`,
            });
        }
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Event fetched successfully',
            data: About,
        };
    }

    // UPDATE
    async update(id: number, updateDto: EventDto) {
        const About = await this.EventRepository.findOne({ where: { id } });
        if (!About) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Event with ID ${id} not found`,
            });
        }

        Object.assign(About, updateDto);
        const updatedAbout = await this.EventRepository.save(About);

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Event updated successfully',
            data: updatedAbout,
        };
    }

    // DELETE
    async delete(id: number) {
        const result = await this.EventRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException({
                status: false,
                statusCode: HttpStatus.NOT_FOUND,
                message: `Event with ID ${id} not found`,
            });
        }

        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: 'Event deleted successfully'
        };
    }
}
