import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestorDocuments } from 'src/entity/investor_documents.entity';
import { InvestorPresentation } from 'src/entity/investor_presentation.entity';


@Injectable()
export class FrontendInvestorPresentationDocumentsService {
  constructor(
    @InjectRepository(InvestorDocuments)
    private readonly InvestorDocumentsRepo: Repository<InvestorDocuments>,
    @InjectRepository(InvestorPresentation)
    private readonly IInvestorPresentationRepo: Repository<InvestorPresentation>,
  ) {}

  async getInvestorPresentationAndDocumentsData() {
    const [presentations, documents] = await Promise.all([
      this.IInvestorPresentationRepo.find(),
      this.InvestorDocumentsRepo.find(),
    ]);

    return {
      statusCode: 200,
      message:
        presentations.length > 0 || documents.length > 0
          ? 'Investor presentation and documents data fetched successfully'
          : 'No investor presentation and documents data found',
      data: {
        presentations,
        documents,
      },
    };
  }
}
