import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestorRelation } from '../../../entity/investor_relation.entity';
import { InvestorRelationController } from './investor_relation.controller';
import { InvestorRelationService } from './investor_relation.service';
import { AuthorisedKmp } from 'src/entity/authorised_kmp.entity';
import { InvestorStockInfo } from 'src/entity/investor_stock_info.entity';
@Module({
  imports: [TypeOrmModule.forFeature([InvestorRelation, AuthorisedKmp, InvestorStockInfo])],
  controllers: [InvestorRelationController],
  providers: [InvestorRelationService],
})
export class InvestorRelationModule {}
