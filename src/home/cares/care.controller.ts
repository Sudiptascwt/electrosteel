import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CareService } from './care.service';
import { CareDto } from '../dto/care.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('home/care')
export class CareController {
  constructor(private readonly careService: CareService) {}

  @Post('create-care')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video_image', maxCount: 1 },
      { name: 'icon_image', maxCount: 1 },
    ]),
  )
  async createCare(
    @Body() data: CareDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      video_image?: Express.Multer.File[];
      icon_image?: Express.Multer.File[];
    },
  ) {
    return this.careService.createCare(data, files);
  }

  @Put('update-care/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video_image', maxCount: 1 },
      { name: 'icon_image', maxCount: 1 },
    ]),
  )
  async updateCare(
    @Param('id') id: number,
    @Body() data: CareDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      video_image?: Express.Multer.File[];
      icon_image?: Express.Multer.File[];
    },
  ) {
    return this.careService.updateCare(id, data, files);
  }
    //get all Cares
    @Get()
    async getAllCares() {
        return this.careService.getAllCares();
    }
    //get Care by id
    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.careService.getCareById(id);
    }
    
    //delete Care by id
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.careService.deleteCare(id);
    }
}