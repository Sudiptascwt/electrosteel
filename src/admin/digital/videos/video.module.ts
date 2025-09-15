import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DigitalVideos } from '../../../entity/digital_videos.entity';
import { DigitalVideosService } from './videos.service';
import { DigitalVideosController } from './videos.controller';

@Module({
    imports: [TypeOrmModule.forFeature([DigitalVideos])],
    controllers: [DigitalVideosController],
    providers: [DigitalVideosService],
})
export class DigitalVideosModule {}
