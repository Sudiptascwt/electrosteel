import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { TestimonialDto } from '../../dto/home_testimonial.dto';

@Controller('home/video-section')
export class   TestimonialController {
  constructor(private readonly service:  TestimonialService) {}

  @Post('create-video-section')
  async create(@Body() data:   TestimonialDto) {
    return this.service.create(data);
  }

  @Put('update-video-section/:id')
  async update(@Param('id') id: number, @Body() data: Partial<  TestimonialDto>) {
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
