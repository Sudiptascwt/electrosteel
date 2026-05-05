// controllers/people_data.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { peopleDataService } from './people_data.service';

@Controller('about/people-data')
export class peopleDataController {
  constructor(private readonly peopleDataService: peopleDataService) {}

  // ==================== SECTION CONTENT ====================
  
  @Get('content')
  async getSectionContent() {
    return this.peopleDataService.getSectionContent();
  }

  @Post('content')
  async upsertSectionContent(@Body() body: any) {
    return this.peopleDataService.upsertSectionContent(body);
  }

  // ==================== CARDS ====================
  
  @Get('cards')
  async getCards() {
    return this.peopleDataService.getCards();
  }

  @Post('cards')
  async upsertCards(@Body() body: any) {
    return this.peopleDataService.upsertCards(body);
  }

  // ==================== TESTIMONIALS ====================
  
  @Get('testimonials')
  async getTestimonials() {
    return this.peopleDataService.getTestimonials();
  }

  @Post('testimonials')
  async upsertTestimonials(@Body() body: any) {
    return this.peopleDataService.upsertTestimonials(body);
  }

  // ==================== REWARDS ====================
  
  @Get('rewards')
  async getRewards() {
    return this.peopleDataService.getRewards();
  }

  @Post('rewards')
  async upsertRewards(@Body() body: any) {
    return this.peopleDataService.upsertRewards(body);
  }
}