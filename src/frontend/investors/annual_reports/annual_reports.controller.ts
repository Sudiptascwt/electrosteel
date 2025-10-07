import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendAnnualReportsService } from './annual_reports.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/investor/annual-report')
export class FrontendAnnualReportsController {
  constructor(private readonly AnnualReportsService: FrontendAnnualReportsService) {}

  //get annual reports data
  @Get()
  async getAnnualReportssData() {
    return this.AnnualReportsService.getAnnualReportssData();
  }
}
