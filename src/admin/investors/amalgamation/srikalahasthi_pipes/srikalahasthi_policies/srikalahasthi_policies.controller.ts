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
import { SrikalahasthiPoliciesService } from './srikalahasthi_policies.service';
import { SrikalahasthiPoliciesDto } from '../../../../../dto/srikalahasthi_policies.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../../role/roles.guard';
import { Roles } from '../../../../../role/roles.decorator';
import { UserRole } from '../../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('srikalahasthi-policies')
export class SrikalahasthiPoliciesController {
  constructor(private readonly SrikalahasthiPoliciesService: SrikalahasthiPoliciesService) {}

  ///////SrikalahasthiPolicies///////////
  // CREATE
  @Post()
  async create(@Body() createDto: SrikalahasthiPoliciesDto) {
    const data = await this.SrikalahasthiPoliciesService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.SrikalahasthiPoliciesService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SrikalahasthiPoliciesService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SrikalahasthiPoliciesDto,
  ) {
    const data = await this.SrikalahasthiPoliciesService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.SrikalahasthiPoliciesService.delete(id);
  }
}
