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
import { InvestorRelationService } from './investor_relation.service';
import { InvestorRelationDto } from '../../../dto/investor_relation.dto';
import { AuthorisedKmpDto } from 'src/dto/authorised_kmp.dto';
import { InvestorStockInfoDto } from 'src/dto/investor_stock_info.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller()
export class InvestorRelationController {
  constructor(private readonly InvestorRelationService: InvestorRelationService) {}

  ///////InvestorRelation///////////
  // CREATE
  @Post('investor-relation')
  async create(@Body() createDto: InvestorRelationDto) {
    const data = await this.InvestorRelationService.create(createDto);
    return data;
  }

  // GET ALL
  @Get('investor-relation')
  async findAll() {
    const data = await this.InvestorRelationService.findAll();
    return data;
  }

  // GET BY ID
  @Get('investor-relation/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.InvestorRelationService.findById(id);
    return data;
  }

  // UPDATE
  @Put('investor-relation/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: InvestorRelationDto,
  ) {
    const data = await this.InvestorRelationService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete('investor-relation/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.InvestorRelationService.delete(id);
  }

/////////////////////authorised_kmp///////////////////////

  @Post('authorised-kmp')
  async createAuthorisedKmp(@Body() createDto: AuthorisedKmpDto) {
    const data = await this.InvestorRelationService.createAuthorisedKmp(createDto);
    return data;
  }

  // GET ALL
  @Get('authorised-kmp')
  async findAllAuthorisedKmps() {
    const data = await this.InvestorRelationService.findAllAuthorisedKmps();
    return data;
  }

  // GET BY ID
  @Get('authorised-kmp/:id')
  async findAuthorisedKmpById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.InvestorRelationService.findAuthorisedKmpById(id);
    return data;
  }

  // UPDATE
  @Put('authorised-kmp/:id')
  async updateAuthorisedKmp(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: AuthorisedKmpDto,
  ) {
    const data = await this.InvestorRelationService.updateAuthorisedKmp(id, updateDto);
    return data;
  }

  // DELETE
  @Delete('authorised-kmp/:id')
  async deleteAuthorisedKmp(@Param('id', ParseIntPipe) id: number) {
    return await this.InvestorRelationService.deleteAuthorisedKmp(id);
  }
  /////////////////////investor_stock_info///////////////////////

  @Post('investor-stock-info')
  async createInvestorStockInfo(@Body() createDto: InvestorStockInfoDto) {
    const data = await this.InvestorRelationService.createInvestorStockInfo(createDto);
    return data;
  }

  // GET ALL
  @Get('investor-stock-info')
  async findAllInvestorStockInfos() {
    const data = await this.InvestorRelationService.findAllInvestorStockInfos();
    return data;
  }

  // GET BY ID
  @Get('investor-stock-info/:id')
  async findInvestorStockInfoById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.InvestorRelationService.findInvestorStockInfoById(id);
    return data;
  }

  // UPDATE
  @Put('investor-stock-info/:id')
  async updateInvestorStockInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: InvestorStockInfoDto,
  ) {
    const data = await this.InvestorRelationService.updateInvestorStockInfo(id, updateDto);
    return data;
  }

  // DELETE
  @Delete('investor-stock-info/:id')
  async deleteInvestorStockInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.InvestorRelationService.deleteInvestorStockInfo(id);
  }
}
export { InvestorRelationService };

