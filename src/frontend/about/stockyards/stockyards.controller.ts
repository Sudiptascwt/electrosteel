import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { StockyardsService } from './stockyards.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/stockyards')
export class StockyardsController {
  constructor(private readonly StockyardsService: StockyardsService) {}

  @Get()
  async getStockyardsData() {
    return this.StockyardsService.getStockyardsData();
  }
}
