import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../../../entity/reports.entity';
import { ReportService } from './reports.service';
import { ReportController } from './reports.controller';
import { CsrReportContent } from 'src/entity/report_content.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Report, CsrReportContent])],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule {}
