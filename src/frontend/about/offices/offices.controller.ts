import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OfficesService } from './offices.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/offices')
export class OfficesController {
  constructor(private readonly OfficesService: OfficesService) {}

  //get overseas offices data
  @Get()
  async getOfficesData(@Query('country') country?: string) {
    return this.OfficesService.getOfficesData(country);
  }
}
