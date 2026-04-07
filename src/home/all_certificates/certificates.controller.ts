import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { AllCertificatesService } from './certificates.service';
import { AllCertificatesDto } from '../../dto/all_certificates.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/all-certificates')
export class AllCertificatesController {
  constructor(private readonly service: AllCertificatesService) {}

  // CREATE
  @Post('create-certificate')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'icon_image', maxCount: 1 },
        { name: 'video_image', maxCount: 1 },
        { name: 'pdf', maxCount: 1 },
        { name: 'pdf2', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (_, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async create(
    @Body() dto: AllCertificatesDto,
    @UploadedFiles()
    files: {
      icon_image?: Express.Multer.File[];
      video_image?: Express.Multer.File[];
      pdf?: Express.Multer.File[];
      pdf2?: Express.Multer.File[];
    },
  ) {
    return this.service.create(dto, files);
  }

  // UPDATE
  @Put('update-certificate/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'icon_image', maxCount: 1 },
        { name: 'video_image', maxCount: 1 },
        { name: 'pdf', maxCount: 1 },
        { name: 'pdf2', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (_, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async update(
    @Param('id') id: number,
    @Body() dto: AllCertificatesDto,
    @UploadedFiles()
    files: {
      icon_image?: Express.Multer.File[];
      video_image?: Express.Multer.File[];
      pdf?: Express.Multer.File[];
      pdf2?: Express.Multer.File[];
    },
  ) {
    return this.service.update(id, dto, files);
  }

  // GET ALL
  @Get()
  async getAll() {
    return this.service.getAll();
  }

  // GET BY ID
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
