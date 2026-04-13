import { Controller, Post, Get, Body } from '@nestjs/common';
import { AboutMainService } from './about_main.service';
import { AboutMainDto } from '../../../dto/about_main.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../../admin/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { growing_strength_dataDto } from '../../../dto/growing_strength_data.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about-main')
export class AboutMainController {
  constructor(private readonly service: AboutMainService) {}

  @Post('save')
  async save(@Body() data: AboutMainDto) {
    return this.service.save(data);
  }

  @Get()
  async getAllAboutMainData() {
    return this.service.getAllAboutMainData();
  }

  @Post('growing_strength-save')
  async growingStrengthSave(@Body() data: growing_strength_dataDto) {  // ✅ Use correct DTO
    return this.service.GrowingStrengthsave(data);
  }

  @Get('get-all-growing-strength-data')
  async getAllGrowingStrengthData() {
    return this.service.getAllGrowingStrengthData();
  }
}