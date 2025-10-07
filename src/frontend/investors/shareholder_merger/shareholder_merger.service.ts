import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShareholderMerger } from 'src/entity/shareholding_merger.entity';


@Injectable()
export class FrontendShareholderMergerService {
  constructor(
    @InjectRepository(ShareholderMerger)
    private readonly ShareholderMergerRepo: Repository<ShareholderMerger>,
  ) {}

  async getShareholderMergerData() {
    const ShareholderMerger = await this.ShareholderMergerRepo.find();
    return {
      statusCode: 200,
      message: ShareholderMerger.length > 0 
        ? 'Shareholder mereger data fetched successfully' 
        : 'No shareholder mereger data found',
      data: ShareholderMerger,
    };
  }
}
