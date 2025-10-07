import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendQuartelyResultService } from './quarterly_results.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/investor/quaterly_result')
export class FrontendQuartelyResultController {
  constructor(private readonly QuartelyResultService: FrontendQuartelyResultService) {}

  //get common banners data
  @Get()
  async getQuartelyResultsData() {
    return this.QuartelyResultService.getQuartelyResultsData();
  }
}
