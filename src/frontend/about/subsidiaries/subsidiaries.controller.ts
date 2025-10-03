import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendSubsidiariesService } from './Subsidiaries.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/subsidiaries')
export class FrontendSubsidiariesController {
  constructor(private readonly SubsidiariesService: FrontendSubsidiariesService) {}

  @Get()
  async getSubsidiariesData() {
    return this.SubsidiariesService.getSubsidiariesData();
  }
}
