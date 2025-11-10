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
import { ManufacturingService } from './manufacturing_unit.service';
import {ManufacturingUnitDto} from '../../dto/manufacturing.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('manufacturing-unit')
export class ManufacturingController {
  constructor(private readonly ManufacturingService: ManufacturingService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: ManufacturingUnitDto) {
    const data = await this.ManufacturingService.create(createDto);
    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'Manufacturing unit details created successfully',
      data,
    };
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.ManufacturingService.findAll();
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Manufacturing unit details fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.ManufacturingService.findById(id);
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Manufacturing unit details fetched successfully',
      data,
    };
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: ManufacturingUnitDto,
  ) {
    const data = await this.ManufacturingService.update(id, updateDto);
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Manufacturing unit details updated successfully',
      data,
    };
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.ManufacturingService.delete(id);
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'Manufacturing unit details deleted successfully',
    };
  }
}
