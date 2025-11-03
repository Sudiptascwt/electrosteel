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
import { NcltService } from './nclt.service';
import { NcltMeetingDto } from '../../../dto/nclt_meetings.dto';
import { NcltFinalOrderDto } from 'src/dto/nclt_final_order.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller()
export class NcltController {
  constructor(private readonly NcltService: NcltService) {}

  ///////nclt meeting///////////
  // CREATE
  @Post('nclt-meeting')
  async create(@Body() createDto: NcltMeetingDto) {
    const data = await this.NcltService.create(createDto);
    return data;
  }

  // GET ALL
  @Get('nclt-meeting')
  async findAll() {
    const data = await this.NcltService.findAll();
    return data;
  }

  // GET BY ID
  @Get('nclt-meeting/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.NcltService.findById(id);
    return data;
  }

  // UPDATE
  @Put('nclt-meeting/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: NcltMeetingDto,
  ) {
    const data = await this.NcltService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete('nclt-meeting/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.NcltService.delete(id);

  }
  ///////////nclt final order//////////////
    // CREATE
  @Post('nclt-finalorder')
  async createNcltFinalOrder(@Body() createDto: NcltFinalOrderDto) {
    const data = await this.NcltService.createNcltFinalOrder(createDto);
    return data;
  }

  // GET ALL
  @Get('nclt-finalorder')
  async findAllNcltFinalOrders() {
    const data = await this.NcltService.findAllNcltFinalOrders();
    return data;
  }

  // GET BY ID
  @Get('nclt-finalorder/:id')
  async findNcltFinalOrderById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.NcltService.findNcltFinalOrderById(id);
    return data;
  }

  // UPDATE
  @Put('nclt-finalorder/:id')
  async updateNcltFinalOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: NcltFinalOrderDto,
  ) {
    const data = await this.NcltService.updateNcltFinalOrder(id, updateDto);
    return data;
  }

  // DELETE
  @Delete('nclt-finalorder/:id')
  async deleteNcltFinalOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.NcltService.deleteNcltFinalOrder(id);

  }
}
