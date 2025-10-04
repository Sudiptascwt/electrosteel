import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QualityResults } from 'src/entity/quaterly_results.entity';

@Injectable()
export class FrontendQuartelyResultService {
  constructor(
    @InjectRepository(QualityResults)
    private readonly QuartelyResultRepo: Repository<QualityResults>,
  ) {}
  //get quaterly result data
    async getQuartelyResultsData() {
        try{
            const quaterly_result = await this.QuartelyResultRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                quaterly_result.length > 0
                    ? 'Quaterly result fetched successfully'
                    : 'No quaterly result found',
                data: quaterly_result,
            };
        } catch(error){
            console.log("error when try to fetch quaterly result.", error);
            throw error;
        }
    }
}