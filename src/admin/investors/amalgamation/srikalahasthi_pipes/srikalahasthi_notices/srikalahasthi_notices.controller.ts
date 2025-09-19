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
import { SrikalahasthiNoticesService } from './srikalahasthi_notices.service';
import { SrikalahasthiNoticesDto } from '../../../../../dto/srikalahasthi_notices.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../../role/roles.guard';
import { Roles } from '../../../../../role/roles.decorator';
import { UserRole } from '../../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('srikalahasthi-notices')
export class SrikalahasthiNoticesController {
  constructor(private readonly SrikalahasthiNoticesService: SrikalahasthiNoticesService) {}

  ///////SrikalahasthiNotices///////////
  // CREATE
  @Post()
  async create(@Body() createDto: SrikalahasthiNoticesDto) {
    const data = await this.SrikalahasthiNoticesService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.SrikalahasthiNoticesService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SrikalahasthiNoticesService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SrikalahasthiNoticesDto,
  ) {
    const data = await this.SrikalahasthiNoticesService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.SrikalahasthiNoticesService.delete(id);
  }
}
