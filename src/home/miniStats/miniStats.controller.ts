import { Controller, Post, Get, Delete, Body, Param, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { miniStatsService } from './miniStats.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { UserRole } from 'src/admin/users/user.entity';
import { Roles } from 'src/role/roles.decorator';

@Controller('home/mini-stats')
export class miniStatsController {
  constructor(private readonly slidesService: miniStatsService) {}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Post('save-mini-stats')
saveSlide(@Body() body: any) {
  return this.slidesService.saveMiniStat({
    ...body
  });
}

  @Get()
  async getAllMiniStats() {
    return this.slidesService.getAllMiniStats();
  }
}