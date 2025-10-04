import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendRegulationService } from './regulation.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/regulation')
export class FrontendRegulationController {
  constructor(private readonly RegulationService: FrontendRegulationService) {}

  //get common banners data
  @Get()
  async getRegulationsData() {
    return this.RegulationService.getRegulationsData();
  }
}
