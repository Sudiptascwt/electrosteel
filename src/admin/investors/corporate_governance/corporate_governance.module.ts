import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporateGovernance } from '../../../entity/corporate_governance.entity';
import { CorporateGovernanceController } from './corporate_governance.controller';
import { CorporateGovernanceService } from './corporate_governance.service';
@Module({
  imports: [TypeOrmModule.forFeature([CorporateGovernance])],
  controllers: [CorporateGovernanceController],
  providers: [CorporateGovernanceService],
})
export class CorporateGovernanceModule {}
