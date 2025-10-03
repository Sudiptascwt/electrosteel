import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendVideosService } from './videos.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/digital/videos')
export class FrontendVideosController {
  constructor(private readonly VideosService: FrontendVideosService) {}

  //get overseas Newsletter data
  @Get()
  async getNewsletterData() {
    return this.VideosService.getDigitalVideosData();
  }
}
