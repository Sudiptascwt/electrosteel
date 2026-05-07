import { BadRequestException, Controller,Get, HttpStatus, Param } from '@nestjs/common';
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

  @Get('all-ProductInnovationData-v2')
  async getAllProductInnovationData() {
    const data = await this.AboutService.getAllProductInnovationDataV2();
    return data;
  }

  @Get('all-EclLegendsData')
  async getAllEclLegendsData() {
    const data = await this.AboutService.getAllEclLegendsData();
    return data;
  }

  @Get('all-MilestonesData')
  async getAllMilestonesData() {
    const data = await this.AboutService.getAllMilestonesData();
    return data;
  }

  @Get('people-data')
  async PeopleData() {
    const data = await this.AboutService.PeopleData();
    return data;
  }
  @Get('common-title/:category')
  async findBlogByCategoryGet(@Param('category') category: string) {
    if (!category) {
      throw new BadRequestException('Category is required');
    }
    return this.AboutService.getCommonTitle(category);
  }


  @Get('page-name/:page_name')
    async findByPageName(@Param('page_name') page_name: string) {
      try {
        if (!page_name) {
          throw new BadRequestException('page_name is required');
        }
        const data = await this.AboutService.findByPageName(page_name);
        return {
          status: true,
          statusCode: HttpStatus.OK,
          message: 'Page meta fetched successfully',
          data,
        };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
}
export { AboutFrontendService };

