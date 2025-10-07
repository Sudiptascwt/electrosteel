import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendInvestorRelationController } from './investor_relations.controller';
import { FrontendInvestorRelationService } from './investor_relations.service';
import { InvestorRelation } from 'src/entity/investor_relation.entity';
import { InvestorStockInfo } from 'src/entity/investor_stock_info.entity';
import { AuthorisedKmp } from 'src/entity/authorised_kmp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvestorRelation, InvestorStockInfo, AuthorisedKmp])],
  controllers: [FrontendInvestorRelationController],
  providers: [FrontendInvestorRelationService],
})
export class FrontendInvestorRelationModule {}