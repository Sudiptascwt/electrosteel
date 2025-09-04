import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { StatisticService } from './statistic.service';
import { StatisticDto } from '../../dto/statistic.dto';
import { bannerMulterOptions } from '../../common/multer_config';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('home/statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  // Create Statistic
  // @Post('create-statistic')
  // @UseInterceptors(AnyFilesInterceptor(bannerMulterOptions))
  // async createStatistic(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() data: StatisticDto,
  // ) {
  //   const overviewImage = files.find(f => f.fieldname === 'overview_image');
  //   const numberVideo = files.find(f => f.fieldname === 'number_video');

  //   return this.statisticService.createStatistic({
  //     ...data,
  //     overview_image: overviewImage?.filename,
  //     number_video: numberVideo?.filename,
  //   });
  // }


  // // Update Statistic
  // @Put('update-statistic/:id')
  // @UseInterceptors(AnyFilesInterceptor(bannerMulterOptions))
  // async updateStatistic(
  //   @Param('id') id: number,
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() data: StatisticDto,
  // ) {
  //   const overviewImage = files?.find(f => f.fieldname === 'overview_image');
  //   const numberVideo = files?.find(f => f.fieldname === 'number_video');

  //   const updateData: Partial<StatisticDto> = {
  //     ...data,
  //     ...(overviewImage && { overview_image: overviewImage.filename }),
  //     ...(numberVideo && { number_video: numberVideo.filename }),
  //   };

  //   return this.statisticService.updateStatistic(id, updateData);
  // }
  @Post('create-statistic')
  async createStatistic(@Body() data: StatisticDto) {
    return this.statisticService.createStatistic(data);
  }

  // Update Statistic
  @Put('update-statistic/:id')
  async updateStatistic(
    @Param('id') id: number,
    @Body() data: Partial<StatisticDto>,
  ) {
    return this.statisticService.updateStatistic(id, data);
  }

  @Get()
  async getAll() {
    return this.statisticService.getAllStatistics();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.statisticService.getStatisticById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.statisticService.deleteStatistic(id);
  }
}
