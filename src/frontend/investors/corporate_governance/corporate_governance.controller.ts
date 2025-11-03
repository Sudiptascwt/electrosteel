import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendcorporateGovernanceService } from './corporate_governance.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/investor/corporate-governance')
export class FrontendcorporateGovernanceController {
  constructor(private readonly corporateGovernanceService: FrontendcorporateGovernanceService) {}

  //get corporate governance data
  @Get()
  async getcorporateGovernanceData() {
    return this.corporateGovernanceService.getcorporateGovernanceData();
  }

  //fetch corporate governance data by dates
  @Get('by-dates')
  async getcorporateGovernanceDataByDates(
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string,
  ) {
    return this.corporateGovernanceService.getcorporateGovernanceDataByDates(from_date, to_date);
  }
}
