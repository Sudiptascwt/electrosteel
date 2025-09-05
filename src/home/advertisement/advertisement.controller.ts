import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementDto } from '../../dto/advertisement.dto';

@Controller('home/advertisement')
export class AdvertisementController {
  constructor(private readonly service: AdvertisementService) {}

  @Post('create-advertisement')
  async create(@Body() data: AdvertisementDto) {
    return this.service.create(data);
  }

  @Put('update-advertisement/:id')
  async update(@Param('id') id: number, @Body() data: Partial<AdvertisementDto>) {
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
