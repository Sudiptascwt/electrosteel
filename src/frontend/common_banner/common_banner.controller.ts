import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendCommonbannerService } from './common_banner.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/common/banner')
export class FrontendCommonbannerController {
  constructor(private readonly CommonBannerService: FrontendCommonbannerService) {}

  //get common banners data
  @Get()
  async getCommonBannersData() {
    return this.CommonBannerService.getCommonBannersData();
  }
}
