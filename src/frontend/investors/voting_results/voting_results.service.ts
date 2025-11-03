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
  //get voting results by dates
  async getVotingResultsByDates(from_date: string, to_date: string) {
    const votingResults = await this.VotingResultsRepo.createQueryBuilder('voting_results')
      .where('voting_results.from_date >= :from_date', { from_date })
      .andWhere('voting_results.to_date <= :to_date', { to_date })
      .getMany(); 
    return {
      statusCode: 200,
      message: votingResults.length > 0 
        ? 'Voting results fetched successfully' 
        : 'No voting result found for the given date range',
      data: votingResults,
    };
  }
}
