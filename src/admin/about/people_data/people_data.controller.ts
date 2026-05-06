// controllers/people_data.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { peopleDataService } from './people_data.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { UserRole } from 'src/admin/users/user.entity';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
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

  @Get('people-content')
  async getPeopleContent() {
    return this.peopleDataService.getPeopleContent();
  }

  @Post('people-content')
  async upsertPeopleContent(@Body() body: any) {
    return this.peopleDataService.upsertPeopleContent(body);
  }
}