import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subsidiaries } from 'src/entity/subsidiaries.entity';

@Injectable()
export class FrontendSubsidiariesService {
  constructor(
    @InjectRepository(Subsidiaries)
    private readonly SubsidiariesRepo: Repository<Subsidiaries>,
  ) {}
  //get quaterly result data
    async getSubsidiariessData() {
        try{
            const quaterly_result = await this.SubsidiariesRepo.find({
                order: {
                id: 'DESC',
                },
            });

            return {
                statusCode: 200,
                message:
                quaterly_result.length > 0
                    ? 'Annual reports fetched successfully'
                    : 'No annual report found',
                data: quaterly_result,
            };
        } catch(error){
            console.log("error when try to fetch annual reports.", error);
            throw error;
        }
    }
}