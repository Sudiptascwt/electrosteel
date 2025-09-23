import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestorDocuments } from '../../../entity/investor_documents.entity';
import { InvestorDocumentsController } from './investor_documents.controller';
import { InvestorDocumentsService } from './investor_documents.service';
@Module({
  imports: [TypeOrmModule.forFeature([InvestorDocuments])],
  controllers: [InvestorDocumentsController],
  providers: [InvestorDocumentsService],
})
export class InvestorDocumentsModule {}
