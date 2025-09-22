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
import { IepfSuspenseService } from './iepf_suspense.service';
import { IepfSuspenseDto } from '../../../dto/iepf_suspense.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('iepf/suspense')
export class IepfSuspenseController {
  constructor(private readonly IepfSuspenseService: IepfSuspenseService) {}

  ///////IepfSuspense///////////
  // CREATE
  @Post()
  async create(@Body() createDto: IepfSuspenseDto) {
    const data = await this.IepfSuspenseService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.IepfSuspenseService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.IepfSuspenseService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: IepfSuspenseDto,
  ) {
    const data = await this.IepfSuspenseService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.IepfSuspenseService.delete(id);
  }
}
export { IepfSuspenseService };

