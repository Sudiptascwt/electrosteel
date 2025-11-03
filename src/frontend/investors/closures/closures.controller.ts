import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendClosureService } from './closures.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendClosureController {
  constructor(private readonly FrontendClosureService: FrontendClosureService) {}

  //get disclosure data
  @Get('frontend/investor/disclosure')
  async getDisclosureData() {
    return this.FrontendClosureService.getDisclosureData();
  }

  //get other disclosure data
  @Get('frontend/investor/other-disclosure')
  async getOtherDisclosureData() {
    return this.FrontendClosureService.getOtherDisclosureData();
  }
}
