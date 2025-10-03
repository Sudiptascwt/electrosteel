import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CsrOverview } from '../../entity/csr_overview.entity';
import { CsrKey } from '../../entity/csr_key.entity';
import { Report } from 'src/entity/reports.entity'; 
import { CsrReportContent } from 'src/entity/report_content.entity';


@Injectable()
export class CsrService {
  constructor(
    @InjectRepository(CsrOverview)
    private readonly OfficeRepo: Repository<CsrOverview>,
    @InjectRepository(CsrKey)
    private readonly CsrKeyRepo: Repository<CsrKey>,
    @InjectRepository(Report)
    private readonly ReportRepo: Repository<Report>,
  ) {}
  //get the Csr OVERVIEW data
    async getCsrOverviewData() {

      const Csr = await this.OfficeRepo.find({
        order: {
          id: 'DESC',
        },
      });

      return {
        statusCode: 200,
        message:
          Csr.length > 0
            ? 'Csr overview fetched successfully'
            : 'No Csr overview found',
        data: Csr,
      };
    }

    async getCsrCommunityDevelopments() {

      const Csr = await this.CsrKeyRepo.find({
        order: {
          id: 'DESC',
        },
      });

      return {
        statusCode: 200,
        message:
          Csr.length > 0
            ? 'Csr keys fetched successfully'
            : 'No Csr key overview found',
        data: Csr,
      };
    }

    async getCsrReports() {

      const CsrReports = await this.ReportRepo.find({
        order: {
          id: 'DESC',
        },
      });

      return {
        statusCode: 200,
        message:
          CsrReports.length > 0
            ? 'Csr keys fetched successfully'
            : 'No Csr key overview found',
        data: CsrReports,
      };
    }

    async getCsrReportContents() {
    try {
        const csrReportContents = await this.ReportRepo.find({
        order: { id: 'DESC' },
        });

        return {
        statusCode: 200,
        message:
            csrReportContents.length > 0
            ? 'CSR report contents fetched successfully'
            : 'No CSR report content found',
        data: csrReportContents,
        };
    } catch (error) {
        console.error('Error fetching CSR report contents:', error);

        return {
        statusCode: 500,
        message: 'An error occurred while fetching CSR report contents',
        error: error.message
        };
    }
    }
}