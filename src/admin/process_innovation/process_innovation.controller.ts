import { Controller, Post, Get, Body } from '@nestjs/common';
import { process_innovationService } from './process_innovation.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRole } from '../users/user.entity';
import  { ProcessInnovationHero } from '../../entity/process_innovation_hero.entity'
import { ProcessInnovationHeroDto } from 'src/dto/process_innovation_hero.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('process-innovation')
export class process_innovationController {
  constructor(private readonly service:process_innovationService) {}

  @Post('/hero/save')
  async saveProcessInnovationHero(@Body() data:ProcessInnovationHeroDto) {
    return this.service.saveProcessInnovationHero(data);
  }

  @Get('/hero')
  async getProcessInnovationHero() {
    return this.service.getProcessInnovationHero();
  }
}