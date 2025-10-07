import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestorRelation } from 'src/entity/investor_relation.entity';
import { InvestorStockInfo } from 'src/entity/investor_stock_info.entity';
import { AuthorisedKmp } from 'src/entity/authorised_kmp.entity';


@Injectable()
export class FrontendInvestorRelationService {
  constructor(
    @InjectRepository(InvestorRelation)
    private readonly InvestorRelationRepo: Repository<InvestorRelation>,
    @InjectRepository(InvestorStockInfo)
    private readonly InvestorStockInfoRepo: Repository<InvestorStockInfo>,
    @InjectRepository(AuthorisedKmp)
    private readonly AuthorisedKmpRepo: Repository<AuthorisedKmp>,
  ) {}

    //get investor relation data
    async getInvestorRelationData() {
        const InvestorRelation = await this.InvestorRelationRepo.find();
        return {
            statusCode: 200,
            message: InvestorRelation.length > 0 
                ? 'Investor relation data fetched successfully' 
                : 'No investor relation data found',
            data: InvestorRelation,
        };
    }

  //get investor stockinfo data
    async getInvestorStockInfoData() {
        const Investor_stock_info = await this.InvestorStockInfoRepo.find();
        return {
            statusCode: 200,
            message: Investor_stock_info.length > 0 
                ? 'Investor stock info data fetched successfully' 
                : 'No investor stock info data found',
            data: Investor_stock_info,
        };
    }

  //get kmp authorized data
    async getKmpAuthorizedData() {
        const investor_kmp_authorized_data = await this.AuthorisedKmpRepo.find();
        return {
            statusCode: 200,
            message: investor_kmp_authorized_data.length > 0 
                ? 'Investor kmp authorized data fetched successfully' 
                : 'No investor kmp authorized data found',
            data: investor_kmp_authorized_data,
        };
    }
}
