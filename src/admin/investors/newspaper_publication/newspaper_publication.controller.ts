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
import { NewspaperPublicationService } from './newspaper_publication.service';
import { NewsPaperPublicationDto } from '../../../dto/newspaper_publication.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('shareholding-information')
export class NewspaperPublicationController {
  constructor(private readonly NewspaperPublicationService: NewspaperPublicationService) {}

  ///////NewspaperPublication///////////
  // CREATE
  @Post()
  async create(@Body() createDto: NewsPaperPublicationDto) {
    const data = await this.NewspaperPublicationService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.NewspaperPublicationService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.NewspaperPublicationService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: NewsPaperPublicationDto,
  ) {
    const data = await this.NewspaperPublicationService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.NewspaperPublicationService.delete(id);
  }
}
export { NewspaperPublicationService };

