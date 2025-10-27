import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FrontendUnclaimedDividendService } from './unclaimed_dividends.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendUnclaimedDividendController {
  constructor(private readonly UnclaimedDividendService: FrontendUnclaimedDividendService) {}

  //get corporate governance data
  @Get('frontend/investor/unclaimeddividend')
  async getUnclaimedDividendData() {
    return this.UnclaimedDividendService.getUnclaimedDividendData();
  }

  //get unclamied dividend by id
  @Get('frontend/investor/unclaimeddividend/:id')
  async getUnclaimedDividendById(@Param('id') id: number) {
    return this.UnclaimedDividendService.getUnclaimedDividendById(id);
  }
}
