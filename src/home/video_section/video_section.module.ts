import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoSection } from '../../entity/home_video_section.entity';
import { VideoSectionService } from './video_section.service';
import { VideoSectionController } from './video_section.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VideoSection])],
  providers: [VideoSectionService],
  controllers: [VideoSectionController],
})
export class VideoSectionModule {}
