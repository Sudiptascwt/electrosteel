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
import { SrikalahasthiCodeOfConductInsidersService } from './srikalahasthi_code_of_conduct_insiders.service';
import { SrikalahasthiCodeOfConductInsidersDto } from '../../../../../dto/srikalahasthi_code_of_conduct_insiders.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../../role/roles.guard';
import { Roles } from '../../../../../role/roles.decorator';
import { UserRole } from '../../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('srikalahasthi-code-of-conduct-insiders')
export class SrikalahasthiCodeOfConductInsidersController {
  constructor(private readonly SrikalahasthiCodeOfConductInsidersService: SrikalahasthiCodeOfConductInsidersService) {}

  ///////SrikalahasthiCodeOfConductInsiders///////////
  // CREATE
  @Post()
  async create(@Body() createDto: SrikalahasthiCodeOfConductInsidersDto) {
    const data = await this.SrikalahasthiCodeOfConductInsidersService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.SrikalahasthiCodeOfConductInsidersService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SrikalahasthiCodeOfConductInsidersService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SrikalahasthiCodeOfConductInsidersDto,
  ) {
    const data = await this.SrikalahasthiCodeOfConductInsidersService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.SrikalahasthiCodeOfConductInsidersService.delete(id);
  }
}
