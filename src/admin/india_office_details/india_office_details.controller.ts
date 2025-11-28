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
import { AllOfficeDetailsService } from './india_office_details.service';
import {AllOfficeDetailsDto} from '../../dto/india_office_details.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('all-type-office-details')
export class AllOfficeDetailsController {
  constructor(private readonly indiaOfficeService: AllOfficeDetailsService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: AllOfficeDetailsDto) {
    const data = await this.indiaOfficeService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.indiaOfficeService.findAll();
    return data
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.indiaOfficeService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: AllOfficeDetailsDto,
  ) {
    const data = await this.indiaOfficeService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.indiaOfficeService.delete(id);
  }
}
