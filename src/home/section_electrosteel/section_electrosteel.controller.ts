import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SectionElectrosteelService } from './section_electrosteel.service';
import { SectionElectrosteelDto } from '../../dto/section_electrosteel.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/section-electrosteel')
export class SectionElectrosteelController {
  constructor(private readonly service: SectionElectrosteelService) {}

  @Post('create-electrosteel')
  async create(@Body() data: SectionElectrosteelDto) {
    return this.service.create(data);
  }

  @Put('update-electrosteel/:id')
  async update(@Param('id') id: number, @Body() data: Partial<SectionElectrosteelDto>) {
    return this.service.update(id, data);
  }

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
