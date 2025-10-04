import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendAnnualReportsController } from './annual_reports.controller';
import { FrontendAnnualReportsService } from './annual_reports.service';
import { AnnualReports } from 'src/entity/annual_reports.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnnualReports])],
  controllers: [FrontendAnnualReportsController],
  providers: [FrontendAnnualReportsService],
})
export class FrontendAnnualReportsModule {}
