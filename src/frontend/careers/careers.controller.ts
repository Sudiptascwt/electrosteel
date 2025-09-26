import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { CareersService } from './careers.service';
// import { CareerDto } from '../../../dto/csr_projects.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('frontend/careers')
export class CareersController {
  constructor(private readonly CareerService: CareersService) {}

  @Get()
  async getCareerData() {
    return this.CareerService.getCareerData();
  }
}
