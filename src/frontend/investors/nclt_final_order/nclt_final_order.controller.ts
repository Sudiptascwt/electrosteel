import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendNcltFinalOrderService } from './nclt_final_order.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('frontend/nclt-final-order')
export class FrontendNcltFinalOrderController {
  constructor(private readonly NcltFinalOrderService: FrontendNcltFinalOrderService) {}

  @Get()
  async getNcltFinalOrderData() {
    return this.NcltFinalOrderService.getNcltFinalOrderData();
  }
}
