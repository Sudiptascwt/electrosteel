import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendVideosController } from './videos.controller';
import { FrontendVideosService } from './videos.service';
import { DigitalVideos } from '../../../entity/digital_videos.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DigitalVideos])],
  controllers: [FrontendVideosController],
  providers: [FrontendVideosService],
})
export class FrontendVideosModule {}
