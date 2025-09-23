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
import { InvestorPresentationService } from './investor_presentation.service';
import { InvestorPresentationDto } from '../../../dto/investor_presentation.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('investor-presentation')
export class InvestorPresentationController {
  constructor(private readonly InvestorPresentationService: InvestorPresentationService) {}

  ///////InvestorPresentation///////////
  // CREATE
  @Post()
  async create(@Body() createDto: InvestorPresentationDto) {
    const data = await this.InvestorPresentationService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.InvestorPresentationService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.InvestorPresentationService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: InvestorPresentationDto,
  ) {
    const data = await this.InvestorPresentationService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.InvestorPresentationService.delete(id);
  }
}
export { InvestorPresentationService };

