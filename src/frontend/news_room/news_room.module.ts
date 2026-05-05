import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendEventsController } from './news_room.controller';
import { FrontendEventsService } from './news_room.service';
import { Event } from  'src/entity/event.entity';
import { EventBanner } from 'src/entity/event_banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventBanner])],
  controllers: [FrontendEventsController],
  providers: [FrontendEventsService],
})
export class FrontendEventsModule {}
