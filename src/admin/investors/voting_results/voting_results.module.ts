import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotingResults } from '../../../entity/voting_results.entity';
import { VotingResultsController } from './voting_results.controller';
import { VotingResultsService } from './voting_results.service';
@Module({
  imports: [TypeOrmModule.forFeature([VotingResults])],
  controllers: [VotingResultsController],
  providers: [VotingResultsService],
})
export class Voting_resultsModule {}
