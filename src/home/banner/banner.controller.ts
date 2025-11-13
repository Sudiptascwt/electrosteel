import { Controller, Post, Body, UseInterceptors, UploadedFile, Put, Param, Delete, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannerDto } from '../../dto/banner.dto';
import { Banner } from '../../entity/banner.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BannerService } from './banner.service';
import { get } from 'http';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';



@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  // Create Banner (Image or Video)
  @Post('create-banner')
  async createBanner(@Body() data: BannerDto) {
    return this.bannerService.createBannerImage(data);
  }

  @Put('update-banner/:id')
  async updateBanner(
    @Param('id') id: number,
    @Body() data: Partial<BannerDto>,
  ) {
    return this.bannerService.updateBannerImage(id, data);
  }


  // Get All Banners
  @Get()
  async getAllBanners() {
    return this.bannerService.getAllBanners();
  }

  // Get Banner By ID
  @Get(':id')
  async getBannerById(@Param('id') id: number) {
    return this.bannerService.getBannerById(id);
  }

  // Delete Banner
  @Delete(':id')
  async deleteBanner(@Param('id') id: number) {
    return this.bannerService.deleteBanner(id);
  }
  // Helper function to detect file type
  private getMediaType(file: Express.Multer.File): string {
    if (!file) return null;
    const ext = extname(file.originalname).toLowerCase();
    return ['.mp4', '.webm', '.mov', '.avi'].includes(ext)
      ? 'video'
      : 'image';
  }
}