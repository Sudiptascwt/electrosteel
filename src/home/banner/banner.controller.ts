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
import { UserRole } from '../../users/user.entity';



@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  // Create Banner (Image or Video)
  @Post('create-banner')
  @UseInterceptors(
    FileInterceptor('banner_media', {
      storage: diskStorage({
        destination: './uploads', // ✅ Store all in the same folder
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `banner-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createBanner(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: BannerDto,
  ) {
    return this.bannerService.createBannerImage({
      ...data,
      banner_media: file?.filename,
      media_type: this.getMediaType(file),
    });
  }

  // Update Banner (Image or Video)
  @Put('update-banner/:id')
  @UseInterceptors(
    FileInterceptor('banner_media', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `banner-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateBanner(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: BannerDto,
  ) {
    return this.bannerService.updateBannerImage(id, {
      ...data,
      banner_media: file?.filename,
      media_type: this.getMediaType(file),
    });
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

  // Inactivate Banner
  @Get('inactive/:id')
  async inactiveBanner(@Param('id') id: number) {
    return this.bannerService.inactiveBanner(id);
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