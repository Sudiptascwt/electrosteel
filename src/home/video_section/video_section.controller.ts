import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { VideoSectionService } from './video_section.service';
import { VideoSectionDto } from '../../dto/home_video_section.dto';

@Controller('home/video-section')
export class VideoSectionController {
  constructor(private readonly service: VideoSectionService) {}

  @Post('create-video-section')
  async create(@Body() data: VideoSectionDto) {
    return this.service.create(data);
  }

  @Put('update-video-section/:id')
  async update(@Param('id') id: number, @Body() data: Partial<VideoSectionDto>) {
    return this.service.update(id, data);
  }

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
