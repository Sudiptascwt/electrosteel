import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShareHoldingInformation } from 'src/entity/share_holding_information.entity';

@Injectable()
export class FrontendShareHoldingPatternService {
  constructor(
    @InjectRepository(ShareHoldingInformation)
    private readonly ShareHoldingPatternRepo: Repository<ShareHoldingInformation>,
  ) {}
    //get quaterly result data
    async getShareHoldingPatternsData() {
        try{
            const shareholding_patterns = await this.ShareHoldingPatternRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                shareholding_patterns.length > 0
                    ? 'Share holding patterns fetched successfully'
                    : 'No Share holding patterns found',
                data: shareholding_patterns,
            };
        } catch(error){
            console.log("error when try to fetch Share holding patterns.", error);
            throw error;
        }
    }
}