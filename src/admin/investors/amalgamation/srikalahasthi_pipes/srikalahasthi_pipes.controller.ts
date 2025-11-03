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
import { SrikalahasthiService } from './srikalahasthi_pipes.service';
import { SrikalahasthiDto } from '../../../../dto/Srikalahasthi.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../role/roles.guard';
import { Roles } from '../../../../role/roles.decorator';
import { UserRole } from '../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller()
export class SrikalahasthiController {
  constructor(private readonly SrikalahasthiService: SrikalahasthiService) {}

  ///////Srikalahasthi///////////
  // CREATE
  @Post('srikalahasthi-pipes')
  async create(@Body() createDto: SrikalahasthiDto) {
    const data = await this.SrikalahasthiService.create(createDto);
    return data;
  }

  // GET ALL
  @Get('srikalahasthi-pipes')
  async findAll() {
    const data = await this.SrikalahasthiService.findAll();
    return data;
  }

  // GET BY ID
  @Get('srikalahasthi-pipes/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SrikalahasthiService.findById(id);
    return data;
  }

  // UPDATE
  @Put('srikalahasthi-pipes/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SrikalahasthiDto,
  ) {
    const data = await this.SrikalahasthiService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete('srikalahasthi-pipes/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.SrikalahasthiService.delete(id);
  }
}
