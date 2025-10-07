import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendIepfSuspenseService } from './iepf_suspense_account.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendIepfSuspenseController {
  constructor(private readonly IepfSuspenseService: FrontendIepfSuspenseService) {}

  //get iepf suspense account data
  @Get('frontend/investor/iepf-suspense-account')
  async getIepfSuspenseData() {
    return this.IepfSuspenseService.getIepfSuspenseData();
  }
}
