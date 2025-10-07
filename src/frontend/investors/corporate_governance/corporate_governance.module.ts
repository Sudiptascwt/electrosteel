import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendcorporateGovernanceController } from './corporate_governance.controller';
import { FrontendcorporateGovernanceService } from './corporate_governance.service';
import { CorporateGovernance } from 'src/entity/corporate_governance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CorporateGovernance])],
  controllers: [FrontendcorporateGovernanceController],
  providers: [FrontendcorporateGovernanceService],
})
export class FrontendcorporateGovernanceModule {}
