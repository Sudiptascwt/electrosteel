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
import { CorporateGovernanceService } from './corporate_governance.service';
import { CorporateGovernanceDto } from '../../../dto/corporate_governance.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('corporate-governance')
export class CorporateGovernanceController {
  constructor(private readonly CorporateGovernanceService: CorporateGovernanceService) {}

  ///////CorporateGovernance///////////
  // CREATE
  @Post()
  async create(@Body() createDto: CorporateGovernanceDto) {
    const data = await this.CorporateGovernanceService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.CorporateGovernanceService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.CorporateGovernanceService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CorporateGovernanceDto,
  ) {
    const data = await this.CorporateGovernanceService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.CorporateGovernanceService.delete(id);
  }
}
export { CorporateGovernanceService };

