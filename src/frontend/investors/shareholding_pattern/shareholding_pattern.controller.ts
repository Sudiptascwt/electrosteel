import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendShareHoldingPatternService } from './shareholding_pattern.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/shareholding-pattern')
export class FrontendShareHoldingPatternController {
  constructor(private readonly ShareHoldingPatternService: FrontendShareHoldingPatternService) {}

  //get common banners data
  @Get()
  async getShareHoldingPatternsData() {
    return this.ShareHoldingPatternService.getShareHoldingPatternsData();
  }
}
