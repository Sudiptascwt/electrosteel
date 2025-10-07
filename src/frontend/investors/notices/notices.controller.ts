import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendNoticesService } from './notices.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendNoticesController {
  constructor(private readonly NoticesService: FrontendNoticesService) {}

  //get corporate governance data
  @Get('frontend/investor/notices')
  async getNoticesData() {
    return this.NoticesService.getNoticesData();
  }
}
