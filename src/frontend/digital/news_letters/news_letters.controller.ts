import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendNewsletterService } from './news_letters.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/digital/newsletter')
export class FrontendNewsletterController {
  constructor(private readonly NewsletterService: FrontendNewsletterService) {}

  //get overseas Newsletter data
  @Get()
  async getNewsletterData() {
    return this.NewsletterService.getNewsletterData();
  }
}
