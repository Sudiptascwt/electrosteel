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
import { AnnualReportsService } from './annual_reports.service';
import {AnnualReportsDto} from '../../../dto/annual_reports.dto';

@Controller('annual-reports')
export class AnnualReportsController {
  constructor(private readonly AnnualReportsService: AnnualReportsService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: AnnualReportsDto) {
    const data = await this.AnnualReportsService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.AnnualReportsService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.AnnualReportsService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: AnnualReportsDto,
  ) {
    const data = await this.AnnualReportsService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.AnnualReportsService.delete(id);

  }
}
