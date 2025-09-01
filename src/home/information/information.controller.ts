import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationDto } from '../../dto/information.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('home/information')
export class InformationController {
  constructor(private readonly service: InformationService) {}

  // CREATE
  @Post('create-information')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'icon_image', maxCount: 1 },
        { name: 'video_image', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  create(
    @Body() dto: InformationDto,
    @UploadedFiles()
    files: { icon_image?: Express.Multer.File[]; video_image?: Express.Multer.File[] },
  ) {
    return this.service.create(dto, files);
  }

  // UPDATE
  @Put('update-information/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'icon_image', maxCount: 1 },
        { name: 'video_image', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  update(
    @Param('id') id: number,
    @Body() dto: InformationDto,
    @UploadedFiles()
    files: { icon_image?: Express.Multer.File[]; video_image?: Express.Multer.File[] },
  ) {
    return this.service.update(id, dto, files);
  }

  // GET BY ID
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  // GET ALL
  @Get()
  getAll() {
    return this.service.getAll();
  }

  // DELETE
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
