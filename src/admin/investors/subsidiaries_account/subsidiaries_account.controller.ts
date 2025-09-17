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
import { SubsidiariesAccountService } from './subsidiaries_account.service';
import {SubsidiariesAccountDto} from '../../../dto/accounts_of_subsidiaries.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('subsidiaries-account')
export class SubsidiariesAccountController {
  constructor(private readonly SubsidiariesAccountService: SubsidiariesAccountService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: SubsidiariesAccountDto) {
    const data = await this.SubsidiariesAccountService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.SubsidiariesAccountService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SubsidiariesAccountService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SubsidiariesAccountDto,
  ) {
    const data = await this.SubsidiariesAccountService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.SubsidiariesAccountService.delete(id);

  }
}
