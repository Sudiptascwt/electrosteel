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
import { LowerStatisticService } from './lower_statistic.service';
import { LowerStatisticDto } from '../../dto/lower_statistic.dto';
import { bannerMulterOptions } from '../../common/multer_config';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/lower-statistic')
export class LowerStatisticController {
  constructor(private readonly LowerStatisticService: LowerStatisticService) {}
  @Post()
  async createLowerStatistic(@Body() data: LowerStatisticDto) {
    return this.LowerStatisticService.createLowerStatistic(data);
  }

  // Update LowerStatistic
  @Put(':id')
  async updateLowerStatistic(
    @Param('id') id: number,
    @Body() data: Partial<LowerStatisticDto>,
  ) {
    return this.LowerStatisticService.updateLowerStatistic(id, data);
  }

  @Get()
  async getAll() {
    return this.LowerStatisticService.getAllLowerStatistics();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.LowerStatisticService.getLowerStatisticById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.LowerStatisticService.deleteLowerStatistic(id);
  }
}
