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
  ) {
    return this.investorService.findByYearOrTitle(year, title, category);
  }
}