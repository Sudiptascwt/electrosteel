import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityResults } from '../../../../entity/quaterly_results.entity';
import { QualityResultsController } from './quaterly_results.controller';
import { QualityResultsService } from './quaterly_results.service';

@Module({
  imports: [TypeOrmModule.forFeature([QualityResults])],
  controllers: [QualityResultsController],
  providers: [QualityResultsService],
})
export class QualityResultsModule {}
