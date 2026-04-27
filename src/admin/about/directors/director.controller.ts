import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { DirectorService } from './director.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about/director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  // CREATE single director
  @Post()
  async create(@Body() body: any) {
    return this.directorService.create(body);
  }

  // CREATE multiple directors (bulk)
  @Post('bulk')
  async createMultiple(@Body() body: any) {
    return this.directorService.createMultiple(body);
  }

  // GET all directors
  @Get()
  async findAll() {
    return this.directorService.findAll();
  }

  // GET director by ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.directorService.findById(id);
  }

  // UPDATE director by ID
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.directorService.update(id, body);
  }

  // DELETE director by ID (hard delete)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.directorService.delete(id);
  }

  // SOFT DELETE director by ID (if you have status field)
  @Delete('soft/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.directorService.softDelete(id);
  }
}