import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendLatestElectrosteelService } from './latest_electrosteel.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/digital/latest-electrosteel')
export class FrontendLatestElectrosteelController {
  constructor(private readonly LatestElectrosteelService: FrontendLatestElectrosteelService) {}

  //get overseas LatestElectrosteel data
  @Get()
  async getLatestElectrosteelData() {
    return this.LatestElectrosteelService.getLatestElectrosteelData();
  }
}
