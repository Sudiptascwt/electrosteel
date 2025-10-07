import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VotingResults } from 'src/entity/voting_results.entity';


@Injectable()
export class FrontendVotingResultsService {
  constructor(
    @InjectRepository(VotingResults)
    private readonly VotingResultsRepo: Repository<VotingResults>,
  ) {}

  async getVotingResultsData() {
    const VotingResults = await this.VotingResultsRepo.find();
    return {
      statusCode: 200,
      message: VotingResults.length > 0 
        ? 'Voting results fetched successfully' 
        : 'No voting result found',
      data: VotingResults,
    };
  }
}
