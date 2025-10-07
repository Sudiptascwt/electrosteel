import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendVotingResultsController } from './voting_results.controller';
import { FrontendVotingResultsService } from './voting_results.service';
import { VotingResults } from 'src/entity/voting_results.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VotingResults])],
  controllers: [FrontendVotingResultsController],
  providers: [FrontendVotingResultsService],
})
export class FrontendVotingResultsModule {}
