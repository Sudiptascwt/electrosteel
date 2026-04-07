import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendSubsidiariesService } from './subsidiaries_account.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/subsidiaries-account')
export class FrontendSubsidiariesController {
  constructor(private readonly SubsidiariesService: FrontendSubsidiariesService) {}

  //get annual reports data
  @Get()
  async getSubsidiariessData() {
    return this.SubsidiariesService.getSubsidiariessData();
  }
}
