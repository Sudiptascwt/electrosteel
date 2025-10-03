import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsrController } from './csr.controller';
import { CsrService } from './csr.service';
import { CsrOverview } from '../../entity/csr_overview.entity';
import { CsrKey } from 'src/entity/csr_key.entity';
import { Report } from 'src/entity/reports.entity'; 
import { CsrReportContent } from 'src/entity/report_content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CsrOverview, CsrKey, Report, CsrReportContent])],
  controllers: [CsrController],
  providers: [CsrService],
})
export class CsrModule {}
