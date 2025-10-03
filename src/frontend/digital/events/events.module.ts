import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendEventsController } from './events.controller';
import { FrontendEventsService } from './events.service';
import { Event } from 'src/entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [FrontendEventsController],
  providers: [FrontendEventsService],
})
export class FrontendEventsModule {}
