import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendShareholderMergerService } from './shareholder_merger.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendShareholderMergerController {
  constructor(private readonly ShareholderMergerService: FrontendShareholderMergerService) {}

  //get corporate governance data
  @Get('frontend/investor/shareholder-merger')
  async getShareholderMergerData() {
    return this.ShareholderMergerService.getShareholderMergerData();
  }
}
