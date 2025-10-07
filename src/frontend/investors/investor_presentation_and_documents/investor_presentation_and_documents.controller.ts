import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendInvestorPresentationDocumentsService } from './investor_presentation_and_documents.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendInvestorPresentationDocumentsController {
  constructor(private readonly InvestorPresentationDocumentsService: FrontendInvestorPresentationDocumentsService) {}

  //get investor presentation and documents data
  @Get('frontend/investor/presenatation-documents')
  async getInvestorPresentationAndDocumentsData() {
    return this.InvestorPresentationDocumentsService.getInvestorPresentationAndDocumentsData();
  }
}