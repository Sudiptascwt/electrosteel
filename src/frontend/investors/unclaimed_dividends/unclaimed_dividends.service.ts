import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnclaimedDividends } from 'src/entity/unclaimed_dividends.entity';
import { UnclaimedDividendsImages } from 'src/entity/unclaimed_dividends_images.entity';


@Injectable()
export class FrontendUnclaimedDividendService {
  constructor(
    @InjectRepository(UnclaimedDividends)
    private readonly UnclaimedDividendRepo: Repository<UnclaimedDividends>,
  ) {}

  async getUnclaimedDividendData() {
    const UnclaimedDividend = await this.UnclaimedDividendRepo.find({
        relations:['documents']
    });
 
    return {
      statusCode: 200,
      message: UnclaimedDividend.length > 0 
        ? 'Unclaimed dividends fetched successfully' 
        : 'No unclaimed diviends found',
      data: UnclaimedDividend,
    };
  }
}
