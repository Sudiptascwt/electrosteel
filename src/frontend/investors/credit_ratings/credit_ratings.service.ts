import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditRatings } from 'src/entity/credit_ratings.entity';

@Injectable()
export class FrontendCreditRatingsService {
  constructor(
    @InjectRepository(CreditRatings)
    private readonly CreditRatingsRepo: Repository<CreditRatings>,
  ) {}

    //get credit ratings data
    async getCreditRatingsData() {
        const CreditRatings = await this.CreditRatingsRepo.find();
        return {
            statusCode: 200,
            message: CreditRatings.length > 0 
                ? 'Credit ratings data fetched successfully' 
                : 'No credit ratings data found',
            data: CreditRatings,
        };
    }
}
