import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/entity/event.entity';

@Injectable()
export class FrontendEventsService {
  constructor(
    @InjectRepository(Event)
    private readonly EventsRepo: Repository<Event>,
  ) {}
  //get the Events data
    async getEventsData() {
        try{
            const Events = await this.EventsRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                Events.length > 0
                    ? 'events fetched successfully'
                    : 'No event data found',
                data: Events,
            };
        } catch(error){
            console.log("error when try to fetch events", error);
            throw error;
        }
    }
}