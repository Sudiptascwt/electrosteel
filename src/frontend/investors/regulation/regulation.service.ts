import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regulation } from 'src/entity/regulation.entity';

@Injectable()
export class FrontendRegulationService {
  constructor(
    @InjectRepository(Regulation)
    private readonly RegulationRepo: Repository<Regulation>,
  ) {}
    //get quaterly result data
    async getRegulationsData() {
        try{
            const quaterly_result = await this.RegulationRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                quaterly_result.length > 0
                    ? 'Regulations fetched successfully'
                    : 'No regulations found',
                data: quaterly_result,
            };
        } catch(error){
            console.log("error when try to fetch regulations result.", error);
            throw error;
        }
    }
}