import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { bannerMulterOptions } from '../common/multer_config';
import { ImageDto } from '../dto/image_file.dto';
import { Image } from '../entity/image_file.entity';


@Controller('files')
export class ImageController {
  constructor(private readonly ImageService: ImageService) {}

  @Post('image-upload')
  @UseInterceptors(FileInterceptor('file', bannerMulterOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ImageDto,
  ) {
    if (!file) throw new BadRequestException('File is required');

    const fileData = {
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
    };

    const saved = await this.ImageService.create(fileData);
    return { status:true, statusCode: 201, message: 'File uploaded', data: saved };
  }

  @Get()
  async findAll() {
    const data = await this.ImageService.findAll();
    return {
      status: true,
      statusCode: 200,
      message: 'Images fetched successfully',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.ImageService.findOne(id);
    return {
      status: true,
      statusCode: 200,
      message: 'Image fetched successfully',
      data,
    };
  }

  @Put('update-image/:id')
  @UseInterceptors(FileInterceptor('file', bannerMulterOptions))
  async update(
  @Param('id') id: number,
  @UploadedFile() file: Express.Multer.File,
  @Body() body: ImageDto,
  ) {
    const updateData: Partial<Image> = {
      ...body,
    };

    if (file) {
      updateData.filename = file.filename;
      updateData.path = file.path;
      updateData.mimetype = file.mimetype;
    }

    const updated = await this.ImageService.update(id, updateData);
    return { status:true, statusCode: 200, message: 'File updated', data: updated };
  }


  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.ImageService.remove(id);
    return { status:true,statusCode: 200, message: 'File deleted' };
  }
}
