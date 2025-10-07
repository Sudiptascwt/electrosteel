import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendAnnualReturnService } from './annual_return.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendAnnualReturnController {
  constructor(private readonly AnnualReturnService: FrontendAnnualReturnService) {}

  //get corporate governance data
  @Get('frontend/investor/annual-return')
  async getAnnualReturnData() {
    return this.AnnualReturnService.getAnnualReturnData();
  }
}
