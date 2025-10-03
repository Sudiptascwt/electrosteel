import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CsrService } from './csr.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

// @UseGuards(ApiKeyGuard)
@Controller('frontend/csr')
export class CsrController {
  constructor(private readonly CsrService: CsrService) {}

  //get overseas Csr data
  @Get('overview')
  async getCsrOverviewData() {
    return this.CsrService.getCsrOverviewData();
  }

  //csr keys area
  @Get('keysarea')
  async getCsrCommunityDevelopments() {
    return this.CsrService.getCsrCommunityDevelopments();
  }

  //csr reports area
  @Get('reports')
  async getCsrReports() {
    return this.CsrService.getCsrReports();
  }

  //csr report contents
  @Get('reports/contents')
  async getCsrReportContents() {
    return this.CsrService.getCsrReportContents();
  }
}
