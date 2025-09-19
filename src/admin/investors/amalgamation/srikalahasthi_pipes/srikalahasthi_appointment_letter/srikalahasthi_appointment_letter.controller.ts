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
import { srikalahasthi_appointment_letterService } from './srikalahasthi_appointment_letter.service';
import { AppointmentletterDto } from '../../../../../dto/srikalahasthi_appointment_letter.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../../role/roles.guard';
import { Roles } from '../../../../../role/roles.decorator';
import { UserRole } from '../../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller()
export class srikalahasthi_appointment_letterController {
  constructor(private readonly srikalahasthi_appointment_letterService: srikalahasthi_appointment_letterService) {}

  ///////srikalahasthi_appointment_letter///////////
  // CREATE
  @Post('srikalahasthi_appointment_letter')
  async create(@Body() createDto: AppointmentletterDto) {
    const data = await this.srikalahasthi_appointment_letterService.create(createDto);
    return data;
  }

  // GET ALL
  @Get('srikalahasthi_appointment_letter')
  async findAll() {
    const data = await this.srikalahasthi_appointment_letterService.findAll();
    return data;
  }

  // GET BY ID
  @Get('srikalahasthi_appointment_letter/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.srikalahasthi_appointment_letterService.findById(id);
    return data;
  }

  // UPDATE
  @Put('srikalahasthi_appointment_letter/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: AppointmentletterDto,
  ) {
    const data = await this.srikalahasthi_appointment_letterService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete('srikalahasthi_appointment_letter/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.srikalahasthi_appointment_letterService.delete(id);
  }
}
