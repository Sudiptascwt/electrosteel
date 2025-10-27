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
import { DisclosuresService } from './disclosures.service';
import { DisclosureDto } from '../../../dto/disclosure.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('disclosures')
export class DisclosuresController {
  constructor(private readonly DisclosuresService: DisclosuresService) {}

  ///////Disclosures///////////
  // CREATE
  @Post()
  async create(@Body() createDto: DisclosureDto) {
    const data = await this.DisclosuresService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.DisclosuresService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.DisclosuresService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: DisclosureDto,
  ) {
    const data = await this.DisclosuresService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.DisclosuresService.delete(id);
  }
}
export { DisclosuresService };

