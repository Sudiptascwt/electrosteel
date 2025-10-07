import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendCsrProjectService } from './csr_projects.service'
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendCsrProjectController {
  constructor(private readonly CsrProjectService: FrontendCsrProjectService) {}

  //get csr projects data
    @Get('frontend/investor/csr-projects')
    async getCsrProjectData(
    @Query('start_date') start_date?: string,
    @Query('end_date') end_date?: string,
    ) {
        return this.CsrProjectService.getCsrProjectData(start_date, end_date);
    }
}
