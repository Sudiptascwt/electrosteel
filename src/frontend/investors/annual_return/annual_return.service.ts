import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnualReturn } from 'src/entity/annual_return.entity';


@Injectable()
export class FrontendAnnualReturnService {
  constructor(
    @InjectRepository(AnnualReturn)
    private readonly AnnualReturnRepo: Repository<AnnualReturn>,
  ) {}

  async getAnnualReturnData() {
    const AnnualReturn = await this.AnnualReturnRepo.find();
    return {
      statusCode: 200,
      message: AnnualReturn.length > 0 
        ? 'Annual return data fetched successfully' 
        : 'No annual return data found',
      data: AnnualReturn,
    };
  }
}
