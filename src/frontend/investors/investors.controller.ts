import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { InvestorService } from './investors.service';

@Controller('frontend/investor')
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}
  
  @Get('investors')  
  async filterByYearOrTitle(
    @Query('year') year?: string,
    @Query('title') title?: string,
    @Query('category') category?: string,
    @Query('is_latest') is_latest?: string,
  ) {
    const isLatestNum = is_latest ? parseInt(is_latest, 10) : undefined;
    return this.investorService.findByYearOrTitle(year, title, category, isLatestNum);
  }

  @Get('nodal-officer')
  async get(@Query('id') id?: string) {
    if (id) {
      return this.investorService.get(parseInt(id));
    }
    return this.investorService.get();
  }
}