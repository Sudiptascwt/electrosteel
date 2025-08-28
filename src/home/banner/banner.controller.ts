import { Controller, Post, Body, UseInterceptors, UploadedFile, Put, Param, Delete, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannerDto } from '../dto/banner.dto';
import { Banner } from '../entity/banner.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BannerService } from './banner.service';
import { get } from 'http';


@Controller('home/banner')
export class BannerController {
    constructor(private readonly bannerService: BannerService) {}
    //create cretificate for home banner
    @Post('create-banner')
    @UseInterceptors(
      FileInterceptor('banner_image', {
        storage: diskStorage({
          destination: './uploads', 
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async createBannerImage(
      @UploadedFile() file: Express.Multer.File,
      @Body() data: BannerDto,
    ) {
      // console.log('Saved file name:', file.filename);
      return this.bannerService.createBannerImage({
        ...data
      });
    }
    //update banner for home banner
    @Put('update-banner/:id')
    @UseInterceptors(
      FileInterceptor('banner_image', {
        storage: diskStorage({
          destination: './uploads', 
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }),
    )
    async updateCertificate(
        @Param('id') id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() data: BannerDto,
    ) {
        return this.bannerService.updateBannerImage(id, {
        ...data,
        banner_image: file?.filename, 
        });
    }
    //get all banners
    @Get()
    async getAllBanners() {
        return this.bannerService.getAllBanners();
    }
    //get banner by id
    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.bannerService.getBannerById(id);
    }
    //delete banner by id
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.bannerService.deleteBanner(id);
    }

    //inactive banner by id
    @Get('inactive/:id')
    async get(@Param('id') id: number) {
        return this.bannerService.inactiveBanner(id);
    }
}