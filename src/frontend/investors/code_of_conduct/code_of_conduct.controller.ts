import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendCodeOfConductService } from './code_of_conduct.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendCodeOfConductController {
  constructor(private readonly CodeOfConductService: FrontendCodeOfConductService) {}

  @Get('frontend/investor/code-of-conduct')
  async getCodeOfConductData() {
    return this.CodeOfConductService.getCodeOfConductData();
  }
  //get policies data
  @Get('frontend/investor/policies')
  async getPoliciesData() {
    return this.CodeOfConductService.getPoliciesData();
  }
}
