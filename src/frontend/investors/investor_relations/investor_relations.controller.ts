import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FrontendInvestorRelationService } from './investor_relations.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendInvestorRelationController {
  constructor(private readonly InvestorRelationService: FrontendInvestorRelationService) {}

    //get INVESTOR RELATION DATA
    @Get('frontend/investor/investor-relation')
    async getInvestorRelationData() {
        return this.InvestorRelationService.getInvestorRelationData();
    }
    //get investor stock info data
    @Get('frontend/investor/stock-info')
    async getInvestorStockInfoData() {
        return this.InvestorRelationService.getInvestorStockInfoData();
    }
    //get investor kmp authorized data
    @Get('frontend/investor/kmp-authorized')
    async getKmpAuthorizedData() {
        return this.InvestorRelationService.getKmpAuthorizedData ();
    }
}
