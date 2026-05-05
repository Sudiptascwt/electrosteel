// src/investor/investor.controller.ts

import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
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

  // CREATE - POST /investor
  // @Post()
  // async create(@Body() body: any) {
  //   return this.investorService.create(body);
  // }

  // BULK CREATE - POST /investor/bulk
  @Post('bulk')
  async createBulk(@Body() body: any, @Req() req: any) {
    const originalBody = JSON.parse(JSON.stringify(body));

    req.body = {
      financialYears: body.financialYears?.map((fy: any) => ({
        year: fy.year,
        resultsCount: fy.results?.length || 0,
      })),
    };

    await this.investorService.createBulk(originalBody);

    return {
      message: 'Investor data saved successfully',
    };
  }

  // GET ALL - GET /investor/all-investors
  @Get('all-investors')
  async findAll(
    @Query('is_latest') is_latest?: string,
    @Query('category') category?: string,
    @Query('year') year?: string,
  ) {
    const isLatestNum = is_latest ? parseInt(is_latest, 10) : undefined;
    
    const result = await this.investorService.findAll(isLatestNum, category, year);
    
    return {
      message: 'Investor data fetched successfully',
      data: result,
    };
  }

  // GET BY YEAR - GET /investor/by-year?year=2024
  @Get('by-year-category')
  async getByYear(
      @Query('year') year: string,
      @Query('category') category?: string,
      @Query('title') title?: string
  ) {
      return this.investorService.findByYear(year, category, title);
  }

  // UPDATE - Post /investor/update-by-year
  @Post('update-by-year-category')
  async updateByYear(@Body() body: any) {
    return this.investorService.updateByYearAndCategory(body);
  }
  // DELETE BY ID - DELETE /investor/:id
  @Delete(':id')
  async delete(@Query('id') id: number) {
    return this.investorService.delete(id);
  }

  // DELETE BY YEAR - DELETE /investor/year/:year
  @Delete('year')
  async deleteByYear(@Query('year') year: string) {
    return this.investorService.deleteByYear(year);
  }
}

export { InvestorService };
