import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendNewsPaperPublicationService } from './news_paper_publication.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/investor/newspaper-publication')
export class FrontendNewsPaperPublicationController {
  constructor(private readonly NewsPaperPublicationService: FrontendNewsPaperPublicationService) {}

  //get common banners data
  @Get()
  async getNewsPaperPublicationsData() {
    return this.NewsPaperPublicationService.getNewsPaperPublicationsData();
  }

  @Get('by-dates')
  async getNewsPaperPublicationsDataByDates(
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string,
  ) {
    return this.NewsPaperPublicationService.getNewsPaperPublicationsDataByDates(from_date, to_date);
  }
}
