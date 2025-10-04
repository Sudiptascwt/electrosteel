import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendQuartelyResultController } from './quarterly_results.controller';
import { FrontendQuartelyResultService } from './quarterly_results.service';
import { QualityResults } from 'src/entity/quaterly_results.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualityResults])],
  controllers: [FrontendQuartelyResultController],
  providers: [FrontendQuartelyResultService],
})
export class FrontendQuartelyResultModule {}
