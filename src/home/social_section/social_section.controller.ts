import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SocialSectionService } from './social_section.service';
import { SocialSectionDto } from '../../dto/social_section.dto';

@Controller('home/social-section')
export class SocialSectionController {
  constructor(private readonly service: SocialSectionService) {}

  @Post('create-social-section')
  async create(@Body() data: SocialSectionDto) {
    return this.service.create(data);
  }

  @Put('update-social-section/:id')
  async update(@Param('id') id: number, @Body() data: Partial<SocialSectionDto>) {
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
