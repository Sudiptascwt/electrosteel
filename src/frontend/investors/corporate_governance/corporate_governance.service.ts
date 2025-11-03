import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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
        ? 'Corporate governance data fetched successfully' 
        : 'No corporate governance data found',
      data: corporateGovernance,
    };
  }

  async getcorporateGovernanceDataByDates(start_date: string, end_date: string) {
    try {
      const data = await this.corporateGovernanceRepo.find({
      where: {
          start_date: MoreThanOrEqual(start_date),
          end_date: LessThanOrEqual(end_date),
      },
      order: { id: 'DESC' },
      });
      return {
        statusCode: 200,
        message: data.length > 0
            ? 'Corporate governance data fetched successfully'
            : 'No corporate governance data found',
        data: data,
      };
    } catch (error) {
        console.error('Error fetching corporate governance data:', error);
        throw error;
    }
  }
}
