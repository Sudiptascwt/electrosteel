import { Controller, Post, Get, Delete, Body, Param, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { water_sectionService } from './water_section.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { UserRole } from 'src/admin/users/user.entity';
import { Roles } from 'src/role/roles.decorator';

@Controller('home/water-section')
export class water_sectionController {
  constructor(private readonly slidesService:water_sectionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('save')
  async saveWaterSectionData(@Body() body: any) {
    return this.slidesService.saveWaterSectionData({
      ...body
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getWaterSectionData() {
    return this.slidesService.getWaterSectionData();
  }
}