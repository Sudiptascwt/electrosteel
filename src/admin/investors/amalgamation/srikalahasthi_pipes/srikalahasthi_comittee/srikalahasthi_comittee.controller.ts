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
import { SrikalahasthiCommiteeService } from './srikalahasthi_comittee.service';
import { SrikalahasthiComitteeDto } from '../../../../../dto/srikalahasthi_comittee.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../../role/roles.guard';
import { Roles } from '../../../../../role/roles.decorator';
import { UserRole } from '../../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('srikalahasthi-commitee')
export class SrikalahasthiCommiteeCommiteeController {
  constructor(private readonly SrikalahasthiCommiteeService: SrikalahasthiCommiteeService) {}

  ///////SrikalahasthiCommiteeCommitee///////////
  // CREATE
  @Post()
  async create(@Body() createDto: SrikalahasthiComitteeDto) {
    const data = await this.SrikalahasthiCommiteeService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.SrikalahasthiCommiteeService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SrikalahasthiCommiteeService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SrikalahasthiComitteeDto,
  ) {
    const data = await this.SrikalahasthiCommiteeService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.SrikalahasthiCommiteeService.delete(id);
  }
}
