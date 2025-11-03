import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendVotingResultsService } from './voting_results.service';
import { ApiKeyGuard } from 'src/common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class FrontendVotingResultsController {
  constructor(private readonly VotingResultsService: FrontendVotingResultsService) {}

  //get voting results data
  @Get('frontend/investor/voting-results')
  async getVotingResultsData() {
    return this.VotingResultsService.getVotingResultsData();
  }

  //get shareholding pattern by dates
  @Get('by-dates')
  async getVotingResultsByDates(
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string,
  ) {
    return this.VotingResultsService.getVotingResultsByDates(from_date, to_date);
  }
}
