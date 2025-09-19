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
import { SrikalahasthiFamiliarizationProgrammeService } from './srikalahasthi_familiarization_programme.service';
import { SrikalahasthiFamiliarizationProgrammeDto } from '../../../../../dto/srikalahasthi_familiarization_programme.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../../role/roles.guard';
import { Roles } from '../../../../../role/roles.decorator';
import { UserRole } from '../../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('srikalahasthi-familiarization-programme')
export class SrikalahasthiFamiliarizationProgrammeController {
  constructor(private readonly SrikalahasthiFamiliarizationProgrammeService: SrikalahasthiFamiliarizationProgrammeService) {}

  ///////SrikalahasthiFamiliarizationProgramme///////////
  // CREATE
  @Post()
  async create(@Body() createDto: SrikalahasthiFamiliarizationProgrammeDto) {
    const data = await this.SrikalahasthiFamiliarizationProgrammeService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.SrikalahasthiFamiliarizationProgrammeService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SrikalahasthiFamiliarizationProgrammeService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SrikalahasthiFamiliarizationProgrammeDto,
  ) {
    const data = await this.SrikalahasthiFamiliarizationProgrammeService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.SrikalahasthiFamiliarizationProgrammeService.delete(id);
  }
}
