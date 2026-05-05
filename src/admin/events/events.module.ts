import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './events.service';
import { EventController } from './events.controller';
import { Event } from 'src/entity/event.entity';
import { EventBanner } from 'src/entity/event_banner.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Event, EventBanner])],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}
