import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnualReports } from 'src/entity/annual_reports.entity';

@Injectable()
export class FrontendAnnualReportsService {
  constructor(
    @InjectRepository(AnnualReports)
    private readonly AnnualReportsRepo: Repository<AnnualReports>,
  ) {}
  //get quaterly result data
    async getAnnualReportssData() {
        try{
            const quaterly_result = await this.AnnualReportsRepo.find({
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