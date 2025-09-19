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
import { SrikalahasthiDirectorsResignationService } from './srikalahasthi_directors_resignation.service';
import { SrikalahasthiDirectorsResignationDto } from '../../../../../dto/srikalahasthi_directors_resignation.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../../role/roles.guard';
import { Roles } from '../../../../../role/roles.decorator';
import { UserRole } from '../../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('srikalahasthi-directors-resignation')
export class SrikalahasthiDirectorsResignationController {
  constructor(private readonly SrikalahasthiDirectorsResignationService: SrikalahasthiDirectorsResignationService) {}

  ///////SrikalahasthiDirectorsResignation///////////
  // CREATE
  @Post()
  async create(@Body() createDto: SrikalahasthiDirectorsResignationDto) {
    const data = await this.SrikalahasthiDirectorsResignationService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.SrikalahasthiDirectorsResignationService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SrikalahasthiDirectorsResignationService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SrikalahasthiDirectorsResignationDto,
  ) {
    const data = await this.SrikalahasthiDirectorsResignationService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.SrikalahasthiDirectorsResignationService.delete(id);
  }
}
