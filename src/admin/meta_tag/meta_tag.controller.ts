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
import { MetaTagService } from './meta_tag.service';
import { MetaTagDto } from '../../dto/meta_tag.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('meta-tag')
export class MetaTagController {
  constructor(private readonly MetaTagService: MetaTagService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: MetaTagDto) {
    const data = await this.MetaTagService.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Meta tag created successfully',
      data,
    };
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.MetaTagService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'All Meta tags fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.MetaTagService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Meta tag fetched successfully',
      data,
    };
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: MetaTagDto,
  ) {
    const data = await this.MetaTagService.update(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Meta tag updated successfully',
      data,
    };
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.MetaTagService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Meta tag deleted successfully',
    };
  }
}
