import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { miniStatsController } from './miniStats.controller';
import { miniStatsService } from './miniStats.service';
import { mini_stats } from '../../entity/mini_stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([mini_stats])],
  controllers: [miniStatsController],
  providers: [miniStatsService],
  exports: [miniStatsService],
})
export class miniStatsModule {}