import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendJolsadhanaService } from './jolsadhana.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/jolsadhana')
export class FrontendJolsadhanaController {
  constructor(private readonly JolsadhanaService: FrontendJolsadhanaService) {}

  @Get()
  async getJolsadhanaData() {
    return this.JolsadhanaService.getJolsadhanaData();
  }
}
