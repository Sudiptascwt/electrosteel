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
import { QualityResultsService } from './quaterly_results.service';
import {QualityResultsDto} from '../../../dto/quaterly_results.dto';

@Controller('quality-results')
export class QualityResultsController {
  constructor(private readonly QualityResultsService: QualityResultsService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: QualityResultsDto) {
    const data = await this.QualityResultsService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.QualityResultsService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.QualityResultsService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: QualityResultsDto,
  ) {
    const data = await this.QualityResultsService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.QualityResultsService.delete(id);

  }
}
