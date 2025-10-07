import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CorporateGovernance } from 'src/entity/corporate_governance.entity';


@Injectable()
export class FrontendcorporateGovernanceService {
  constructor(
    @InjectRepository(CorporateGovernance)
    private readonly corporateGovernanceRepo: Repository<CorporateGovernance>,
  ) {}

  async getcorporateGovernanceData() {
    const corporateGovernance = await this.corporateGovernanceRepo.find();
    return {
      statusCode: 200,
      message: corporateGovernance.length > 0 
        ? 'corporate governance data fetched successfully' 
        : 'No corporate governance data found',
      data: corporateGovernance,
    };
  }
}
