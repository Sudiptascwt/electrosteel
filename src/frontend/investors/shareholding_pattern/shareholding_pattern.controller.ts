import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendShareHoldingPatternService } from './shareholding_pattern.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/investor/shareholding-pattern')
export class FrontendShareHoldingPatternController {
  constructor(private readonly ShareHoldingPatternService: FrontendShareHoldingPatternService) {}

  //get common banners data
  @Get()
  async getShareHoldingPatternsData() {
    return this.ShareHoldingPatternService.getShareHoldingPatternsData();
  }
  
  //get shareholding pattern by dates
  @Get('by-dates')
  async getShareHoldingPatternsByDates(
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string,
  ) {
    return this.ShareHoldingPatternService.getShareHoldingPatternsByDates(from_date, to_date);
  }
}
