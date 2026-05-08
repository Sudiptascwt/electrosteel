import { Controller, Get, Post, Put, Delete, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { FlangePipeService } from './flange-pipe.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('flange-pipes')
export class FlangePipeController {
  constructor(private readonly flangePipeService: FlangePipeService) {}

  // ==================== TABLE SECTION APIs ====================
  
  @Post('table')
  @HttpCode(HttpStatus.OK)
  async createOrUpdateTable(@Body() body: any) {
    return await this.flangePipeService.createOrUpdateTable(body);
  }

  @Get('table')
  async getTableData() {
    return await this.flangePipeService.getTableData();
  }

  @Delete('table')
  async deleteTableData() {
    return await this.flangePipeService.deleteTableData();
  }

  // ==================== APPLICATION SECTION APIs ====================
  
  @Post('application')
  @HttpCode(HttpStatus.OK)
  async createOrUpdateApplication(@Body() body: any) {
    return await this.flangePipeService.createOrUpdateApplication(body);
  }

  @Get('application')
  async getApplicationData() {
    return await this.flangePipeService.getApplicationData();
  }

  @Delete('application')
  async deleteApplicationData() {
    return await this.flangePipeService.deleteApplicationData();
  }

  // ==================== ADVANTAGE SECTION APIs ====================
  
  @Post('advantage')
  @HttpCode(HttpStatus.OK)
  async createOrUpdateAdvantage(@Body() body: any) {
    return await this.flangePipeService.createOrUpdateAdvantage(body);
  }

  @Get('advantage')
  async getAdvantageData() {
    return await this.flangePipeService.getAdvantageData();
  }

  @Delete('advantage')
  async deleteAdvantageData() {
    return await this.flangePipeService.deleteAdvantageData();
  }

  // ==================== GET ALL SECTIONS TOGETHER ====================
  
  @Get('all')
  async getAllSections() {
    return await this.flangePipeService.getAllSections();
  }
}