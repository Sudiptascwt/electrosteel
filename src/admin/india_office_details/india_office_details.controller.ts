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
import { IndiaOfficeDetailsService } from './india_office_details.service';
import {IndiaOfficeDetailsDto} from '../../dto/india_office_details.dto';

@Controller('india-office-details')
export class IndiaOfficeDetailsController {
  constructor(private readonly indiaOfficeService: IndiaOfficeDetailsService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: IndiaOfficeDetailsDto) {
    const data = await this.indiaOfficeService.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'India office details created successfully',
      data,
    };
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.indiaOfficeService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'India office details fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.indiaOfficeService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'India office details fetched successfully',
      data,
    };
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: IndiaOfficeDetailsDto,
  ) {
    const data = await this.indiaOfficeService.update(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'India office details updated successfully',
      data,
    };
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.indiaOfficeService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'India office details deleted successfully',
    };
  }
}
