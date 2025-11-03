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
import { JolsadhanaService } from './jol_sadhana.service';
import {JolsadhanaDto} from '../../dto/jol_sadhana.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('jolsadhana')
export class JolsadhanaController {
  constructor(private readonly JolsadhanaService: JolsadhanaService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: JolsadhanaDto) {
    const data = await this.JolsadhanaService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.JolsadhanaService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.JolsadhanaService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: JolsadhanaDto,
  ) {
    const data = await this.JolsadhanaService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.JolsadhanaService.delete(id);
  }
}
