// src/investor/investor.controller.ts

import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvestorService } from './investor_files.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { RolesGuard } from 'src/role/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('investor')
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  // ✅ CREATE BULK
  @Post('bulk')
  async createBulk(@Body() body: any) {
    await this.investorService.createBulk(body);

    return {
      message: 'Investor data saved successfully',
    };
  }

  // ✅ GET ALL
  @Get('all-investors')
  async getAll() {
    return {
      message: 'Investor data fetched successfully',
      data: await this.investorService.findAll(),
    };
  }

  // ✅ GET BY YEAR
  @Get('by-year')
  async getByYear(@Query('year') year: string) {
    return this.investorService.findByYear(year);
  }

  // ✅ UPDATE
  @Post(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return this.investorService.update(id, body);
  }

  // ✅ DELETE
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.investorService.delete(id);
  }

    @Delete('year/:year')
    async deleteByYear(@Param('year') year: string) {
    return this.investorService.deleteByYear(year);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number) {
    return this.investorService.deleteById(+id); 
    }
}

export { InvestorService };
