import { Controller, Post, Get, Delete, Body, Param, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { HomeSlidesService } from './home_slides.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { UserRole } from 'src/admin/users/user.entity';
import { Roles } from 'src/role/roles.decorator';

@Controller('home/slides')
export class HomeSlidesController {
  constructor(private readonly slidesService: HomeSlidesService) {}

  @Post('save-slide')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'src', maxCount: 1 }], {
      storage: diskStorage({
        destination: './uploads/slides',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `slide-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('save-slide')
  saveSlide(@Body() body: any) {
      return this.slidesService.saveSlide(body);
  }

  @Get()
  async getAllSlides() {
    return this.slidesService.getAllSlides();
  }
}