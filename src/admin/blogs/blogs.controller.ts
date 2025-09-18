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
import { BlogsService } from './blogs.service';
import { BlogsDto } from '../../dto/Blogs.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('blogs')
export class BlogsController {
  constructor(private readonly BlogsService: BlogsService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: BlogsDto) {
    const data = await this.BlogsService.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Blog created successfully',
      data,
    };
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.BlogsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'All Blogs fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.BlogsService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Blog fetched successfully',
      data,
    };
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: BlogsDto,
  ) {
    const data = await this.BlogsService.update(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Blog updated successfully',
      data,
    };
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.BlogsService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Blog deleted successfully',
    };
  }

  //GET BLOG BY NAME
  @Get('blog/:category')
  async findBlogByName(@Param('category') category: string) {
    const data = await this.BlogsService.findBlogByName(category);
    return {
      statusCode: HttpStatus.OK,
      message: 'Blog fetched successfully',
      data,
    };
  }
}