import { Module } from '@nestjs/common';
import { LowerStatisticService } from './lower_statistic.service';
import { LowerStatisticController } from './lower_statistic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LowerStatistic } from '../../entity/lower_statistic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LowerStatistic]), 
  ],
  providers: [LowerStatisticService],
  controllers: [LowerStatisticController]
})
export class LowerStatisticModule {}