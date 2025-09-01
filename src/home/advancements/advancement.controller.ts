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
import { AdvancementService } from './advancement.service';
import { AdvancementDto } from '../../dto/advancement.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/advancements')
export class AdvancementController {
  constructor(private readonly advancementService: AdvancementService) {}

  // CREATE with file upload
  @Post('create-advancement')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: './uploads', // save files in uploads folder
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createAdvancement(
    @Body() data: AdvancementDto,
    @UploadedFiles() files: { image?: Express.Multer.File[], pdf?: Express.Multer.File[] },
  ) {
    if (files.image) data.image = files.image[0].filename;
    if (files.pdf) data.pdf = files.pdf[0].filename;
    return this.advancementService.createAdvancement(data);
  }

  // UPDATE with optional file upload
  @Put('update-advancement/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateAdvancement(
    @Param('id') id: number,
    @Body() data: AdvancementDto,
    @UploadedFiles() files: { image?: Express.Multer.File[], pdf?: Express.Multer.File[] },
  ) {
    if (files.image) data.image = files.image[0].filename;
    if (files.pdf) data.pdf = files.pdf[0].filename;
    return this.advancementService.updateAdvancement(id, data);
  }

  // GET ALL
  @Get()
  async getAllAdvancements() {
    return this.advancementService.getAllAdvancements();
  }

  // GET ONE
  @Get(':id')
  async getAdvancementById(@Param('id') id: number) {
    return this.advancementService.getAdvancementById(id);
  }

  // DELETE
  @Delete(':id')
  async deleteAdvancement(@Param('id') id: number) {
    return this.advancementService.deleteAdvancement(id);
  }
}
