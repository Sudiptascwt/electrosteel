import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendNewsPaperPublicationService } from './news_paper_publication.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/newspaper-publication')
export class FrontendNewsPaperPublicationController {
  constructor(private readonly NewsPaperPublicationService: FrontendNewsPaperPublicationService) {}

  //get common banners data
  @Get()
  async getNewsPaperPublicationsData() {
    return this.NewsPaperPublicationService.getNewsPaperPublicationsData();
  }
}
