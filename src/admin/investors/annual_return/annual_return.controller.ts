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
import { AnnualReturnService } from './annual_return.service';
import { AnnualReturnDto } from '../../../dto/annual_return.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('annual-return')
export class AnnualReturnController {
  constructor(private readonly AnnualReturnService: AnnualReturnService) {}

  ///////AnnualReturn///////////
  // CREATE
  @Post()
  async create(@Body() createDto: AnnualReturnDto) {
    const data = await this.AnnualReturnService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.AnnualReturnService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.AnnualReturnService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: AnnualReturnDto,
  ) {
    const data = await this.AnnualReturnService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.AnnualReturnService.delete(id);
  }
}
export { AnnualReturnService };

