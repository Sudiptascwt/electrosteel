import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { FooterService } from './Footer.service';
// import { FooterDto } from '../../dto/Footer.dto';
import { AdvertisementDto } from 'src/dto/advertisement.dto';

@Controller('home/Footer')
export class FooterController {
  constructor(private readonly service: FooterService) {}

  @Post('create-Footer')
  async create(@Body() data: AdvertisementDto) {
    return this.service.create(data);
  }

  @Put('update-Footer/:id')
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
