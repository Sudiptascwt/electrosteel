import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendInvestorPresentationDocumentsController } from './investor_presentation_and_documents.controller';
import { FrontendInvestorPresentationDocumentsService } from './investor_presentation_and_documents.service';
import { InvestorDocuments } from 'src/entity/investor_documents.entity';
import { InvestorPresentation } from 'src/entity/investor_presentation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvestorPresentation, InvestorDocuments])],
  controllers: [FrontendInvestorPresentationDocumentsController],
  providers: [FrontendInvestorPresentationDocumentsService],
})
export class FrontendInvestorPresentationDocumentsModule {}
