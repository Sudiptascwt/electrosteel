// src/fac/fac.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FacService } from './paint_fac.service';
import { CreateFacDto } from '../../../dto/paint_fac.dto';

@Controller('product/paint/fac')
export class FacController {
  constructor(private readonly facService: FacService) {}

  @Post()
  create(@Body() createFacDto: CreateFacDto) {
    return this.facService.create(createFacDto);
  }

  // ADD THIS - for PUT /product/paint/fac
  @Put()
  upsertRoot(@Body() createFacDto: CreateFacDto) {
    // This will create/update with a default ID (e.g., 1)
    return this.facService.upsert(1, createFacDto);
  }

  @Put(':id')
  upsert(@Param('id') id: string, @Body() createFacDto: CreateFacDto) {
    return this.facService.upsert(+id, createFacDto);
  }

  @Post(':id')
  upsertPost(@Param('id') id: string, @Body() createFacDto: CreateFacDto) {
    return this.facService.upsert(+id, createFacDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createFacDto: CreateFacDto) {
    return this.facService.update(+id, createFacDto);
  }

  @Post('save/:id')
  save(@Param('id') id: string, @Body() createFacDto: CreateFacDto) {
    return this.facService.upsertEfficient(+id, createFacDto);
  }

  @Get()
  findAll() {
    return this.facService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facService.remove(+id);
  }

  @Post('seed')
  seed() {
    return this.facService.seedDefault();
  }
}