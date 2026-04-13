import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementDto } from '../../dto/advertisement.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/advertisement')
export class AdvertisementController {
  constructor(private readonly service: AdvertisementService) {}

  @Post('save')
  async save(@Body() data: AdvertisementDto) {
    return this.service.save(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllMilestonesData() {
    return this.service.getAllAdvertisementData();
  }
}
