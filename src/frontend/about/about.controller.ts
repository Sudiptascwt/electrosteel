import { Controller,Get } from '@nestjs/common';
import { AboutFrontendService } from './about.service';

@Controller('frontend/about')
export class AboutFrontendController {
  constructor(private readonly AboutService: AboutFrontendService) {}

  ///////About///////////
  // GET About main data
  @Get('get-about-main-data')
  async getAllAboutMainData() {
    const data = await this.AboutService.getAllAboutMainData();
    return data;
  }

  @Get('vision-mission-data')
  async getAllVisionMissionData() {
    const data = await this.AboutService.getAllVisionMissionData();
    return data;
  }

  @Get('board-of-committee-data')
  async getAllBoardCommitteePageData() {
    const data = await this.AboutService.getAllBoardCommitteePageData();
    return data;
  }

  @Get('all-directors')
  async getAllDirectors() {
    const data = await this.AboutService.getAllDirectors();
    return data;
  }

  @Get('all-ProcessInnovationData')
  async getAllProcessInnovationData() {
    const data = await this.AboutService.getAllProcessInnovationData();
    return data;
  }

  @Get('all-ProductInnovationData')
  async getAllProductInnovationData() {
    const data = await this.AboutService.getAllProductInnovationData();
    return data;
  }

}
export { AboutFrontendService };

