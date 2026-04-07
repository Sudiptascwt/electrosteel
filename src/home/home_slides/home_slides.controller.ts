import { Controller, Post, Get, Delete, Body, Param, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { HomeSlidesService } from './home_slides.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/home-slides')
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
  async saveSlide(@Body() data: any, @UploadedFiles() files: any) {
    if (files?.src) {
      data.src = files.src[0].filename;
    }
    return this.slidesService.saveSlide(data);
  }

  @Get()
  async getAllSlides() {
    return this.slidesService.getAllSlides();
  }

  @Get(':id')
  async getSlideById(@Param('id') id: string) {
    return this.slidesService.getSlideById(parseInt(id));
  }

  @Delete(':id')
  async deleteSlide(@Param('id') id: string) {
    return this.slidesService.deleteSlide(parseInt(id));
  }
}