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
import { SrikalahasthiInvestorContactService } from './srikalahasthi_investor_contact.service';
import { SrikalahasthiInvestorContactDto } from '../../../../../dto/srikalahasthi_investor_contact.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../../../role/roles.guard';
import { Roles } from '../../../../../role/roles.decorator';
import { UserRole } from '../../../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('srikalahasthi-notices')
export class SrikalahasthiInvestorContactController {
  constructor(private readonly SrikalahasthiInvestorContactService: SrikalahasthiInvestorContactService) {}

  ///////SrikalahasthiInvestorContact///////////
  // CREATE
  @Post()
  async create(@Body() createDto: SrikalahasthiInvestorContactDto) {
    const data = await this.SrikalahasthiInvestorContactService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.SrikalahasthiInvestorContactService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SrikalahasthiInvestorContactService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SrikalahasthiInvestorContactDto,
  ) {
    const data = await this.SrikalahasthiInvestorContactService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.SrikalahasthiInvestorContactService.delete(id);
  }
}
