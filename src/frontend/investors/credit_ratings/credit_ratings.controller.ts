import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendCreditRatingsService } from './credit_ratings.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendCreditRatingsController {
  constructor(private readonly CreditRatingsService: FrontendCreditRatingsService) {}

    //get INVESTOR RELATION DATA
    @Get('frontend/investor/credit-ratings')
    async getCreditRatingsData() {
        return this.CreditRatingsService.getCreditRatingsData();
    }
}
