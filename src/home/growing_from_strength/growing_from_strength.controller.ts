import { Controller, Post, Get, Delete, Body, Param, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {growing_from_strengthService } from './growing_from_strength.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { UserRole } from 'src/admin/users/user.entity';
import { Roles } from 'src/role/roles.decorator';

@Controller('home/growing-strength-data')
export class growing_from_strengthController {
  constructor(private readonly slidesService:growing_from_strengthService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('save')
  saveSlide(@Body() body: any) {
    return this.slidesService.saveGrowingStrengthData({
      ...body
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllGrowingStrengthData() {
    return this.slidesService.getAllGrowingStrengthData();
  }
}