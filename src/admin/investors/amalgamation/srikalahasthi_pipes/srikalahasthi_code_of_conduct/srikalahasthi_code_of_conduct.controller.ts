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
import { srikalahasthiCodeOfConductService } from './srikalahasthi_code_of_conduct.service';
import { SrikalahasthiCodeOfConductDto } from '../../../../../dto/srikalahasthi_code_of_conduct.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../../role/roles.guard';
import { Roles } from '../../../../../role/roles.decorator';
import { UserRole } from '../../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('srikalahasthi-code-of-conduct-insiders')
export class srikalahasthiCodeOfConductController {
  constructor(private readonly srikalahasthiCodeOfConductService: srikalahasthiCodeOfConductService) {}

  ///////srikalahasthiCodeOfConduct///////////
  // CREATE
  @Post()
  async create(@Body() createDto: SrikalahasthiCodeOfConductDto) {
    const data = await this.srikalahasthiCodeOfConductService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.srikalahasthiCodeOfConductService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.srikalahasthiCodeOfConductService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SrikalahasthiCodeOfConductDto,
  ) {
    const data = await this.srikalahasthiCodeOfConductService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.srikalahasthiCodeOfConductService.delete(id);
  }
}
