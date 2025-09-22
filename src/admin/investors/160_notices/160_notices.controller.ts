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
import { Notices160Service } from './160_notices.service';
import { Notices160Dto } from '../../../dto/160_notice.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('notices160')
export class Notices160Controller {
  constructor(private readonly Notices160Service: Notices160Service) {}

  ///////Notices160///////////
  // CREATE
  @Post()
  async create(@Body() createDto: Notices160Dto) {
    const data = await this.Notices160Service.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.Notices160Service.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.Notices160Service.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Notices160Dto,
  ) {
    const data = await this.Notices160Service.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.Notices160Service.delete(id);
  }
}
export { Notices160Service };

