import {
  Controller,
  Get,
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
}
