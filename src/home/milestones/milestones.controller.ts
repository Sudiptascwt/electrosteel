import { Controller, Post, Get, Put, Patch, Delete, Body, Param, Query, UseGuards, Logger } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { UserRole } from 'src/admin/users/user.entity';
import { Roles } from 'src/role/roles.decorator';

@Controller('home/milestone')
export class MilestonesController {
  private readonly logger = new Logger(MilestonesController.name);

  constructor(private readonly milestonesService: MilestonesService) {}

  // SPECIFIC ROUTES FIRST (no parameters)
  @Get('all')
  async getAllMilestones() {
    return this.milestonesService.getAllMilestonesData();
  }

  @Get('all-hero')
  async getMilestoneHeroData() {
    return this.milestonesService.getMilestoneHeroData();
  }

  // @Get('paginated/all')
  // async getPaginatedMilestones(
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 10
  // ) {
  //   return this.milestonesService.getMilestonesWithPagination(page, limit);
  // }

  // PARAMETERIZED ROUTES AFTER specific routes
  @Get(':id')
  async getMilestoneById(@Param('id') id: number) {
    return this.milestonesService.getMilestoneById(id);
  }

  // @Get('heading/:id')
  // async getHeadingById(@Param('id') id: number) {
  //   return this.milestonesService.getHeadingById(id);
  // }

  // ADMIN ROUTES
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  async createMilestones(@Body() body: any) {
    return this.milestonesService.createMilestonesData(body);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  // @Put('update')
  // async updateMilestones(@Body() body: any) {
  //   return this.milestonesService.updateMilestonesData(body);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('update/:id')
  async updateMilestonesData(
    @Param('id') id: number,
    @Body() body: any
  ) {
    return this.milestonesService.updateMilestonesData(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  async deleteMilestone(@Param('id') id: number) {
    return this.milestonesService.deleteMilestone(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('delete/all')
  async deleteAllMilestones() {
    return this.milestonesService.deleteAllMilestones();
  }

  // ADMIN ROUTES
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('update-hero')
  async SaveMilestoneHeroData(@Body() body: any) {
    return this.milestonesService.SaveMilestoneHeroData(body);
  }

  // ADMIN ROUTES
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('heading/update')
  async SaveMilestoneHeadingData(@Body() body: any) {
    return this.milestonesService.SaveMilestoneHeadingData(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('heading/all')
  async getMilestoneHeadingData() {
    return this.milestonesService.getMilestoneHeadingData();
  }
}