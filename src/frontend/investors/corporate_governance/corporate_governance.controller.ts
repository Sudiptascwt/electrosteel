import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendcorporateGovernanceService } from './corporate_governance.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendcorporateGovernanceController {
  constructor(private readonly corporateGovernanceService: FrontendcorporateGovernanceService) {}

  //get corporate governance data
  @Get('frontend/investor/corporate-governance')
  async getcorporateGovernanceData() {
    return this.corporateGovernanceService.getcorporateGovernanceData();
  }
}
