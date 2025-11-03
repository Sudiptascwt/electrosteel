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
import { UserRole } from '../../admin/users/user.entity';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('home/statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}
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
