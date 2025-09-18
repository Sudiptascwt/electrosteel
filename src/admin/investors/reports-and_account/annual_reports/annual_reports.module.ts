import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnualReports } from '../../../../entity/annual_reports.entity';
import { AnnualReportsController } from './annual_reports.controller';
import { AnnualReportsService } from './annual_reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnnualReports])],
  controllers: [AnnualReportsController],
  providers: [AnnualReportsService],
})
export class AnnualReportsModule {}
