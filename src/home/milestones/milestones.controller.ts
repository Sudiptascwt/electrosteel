import { Controller, Post, Get, Delete, Body, Param, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MilestonesService } from './milestones.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { UserRole } from 'src/admin/users/user.entity';
import { Roles } from 'src/role/roles.decorator';

@Controller('home/milestone')
export class milestonesController {
  constructor(private readonly slidesService:MilestonesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('save')
  saveSlide(@Body() body: any) {
    return this.slidesService.saveMilestonesData({
      ...body
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllMilestonesData() {
    return this.slidesService.getAllMilestonesData();
  }
}