import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { OfficesService } from './Offices.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

// @UseGuards(ApiKeyGuard)
@Controller('frontend/offices')
export class OfficesController {
  constructor(private readonly OfficesService: OfficesService) {}

  @Get()
  async getIndianOfficesData() {
    return this.OfficesService.getIndianOfficesData();
  }
}
