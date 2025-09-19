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
import { ShareHoldingInformationService } from './shareholding_information.service';
import { ShareHoldingInformationDto } from '../../../dto/share_holding_information.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('shareholding-information')
export class ShareHoldingInformationController {
  constructor(private readonly ShareHoldingInformationService: ShareHoldingInformationService) {}

  ///////ShareHoldingInformation///////////
  // CREATE
  @Post()
  async create(@Body() createDto: ShareHoldingInformationDto) {
    const data = await this.ShareHoldingInformationService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.ShareHoldingInformationService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.ShareHoldingInformationService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: ShareHoldingInformationDto,
  ) {
    const data = await this.ShareHoldingInformationService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.ShareHoldingInformationService.delete(id);
  }
}
