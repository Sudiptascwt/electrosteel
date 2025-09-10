import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../../../entity/reports.entity';
import { ReportService } from './reports.service';
import { ReportController } from './reports.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Report])],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule {}
