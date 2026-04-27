// blogs.controller.ts
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
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsDto } from '../../dto/blogs.dto';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('blogs')
export class BlogsController {
  constructor(private readonly BlogsService: BlogsService) {}

  // CREATE - POST /blogs
  @Post()
  async create(@Body() createDto: BlogsDto) {
    try {
      const data = await this.BlogsService.create(createDto);
      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        message: 'Blog created successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // GET ALL - GET /blogs
  @Get()
  async findAll() {
    try {
      const data = await this.BlogsService.findAll();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'All Blogs fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // GET BY ID - GET /blogs/:id
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.BlogsService.findById(id);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Blog fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // UPDATE - PUT /blogs/:id
  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: BlogsDto,
  ) {
    try {
      const data = await this.BlogsService.update(id, updateDto);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Blog updated successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // DELETE - DELETE /blogs/:id
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.BlogsService.delete(id);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Blog deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // FIND BY CATEGORY - POST /blogs/find-by-category (RECOMMENDED - SIMPLE)
  @Get('blog/find-by-category/:category')
  async findBlogByCategoryGet(@Param('category') category: string) {
    try {
      if (!category) {
        throw new BadRequestException('Category is required');
      }
      
      const data = await this.BlogsService.findBlogByName(category);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Blog fetched successfully',
        data,  // This will be an array of blogs
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // FIND BY CATEGORY - POST /blogs/blog/find-by-category (FOR BACKWARD COMPATIBILITY)
  // @Post('blog/find-by-category')
  // async findBlogByNameAlt(@Body() body: { category: string }) {
  //   try {
  //     if (!body.category) {
  //       throw new BadRequestException('Category is required');
  //     }
      
  //     const data = await this.BlogsService.findBlogByName(body.category);
  //     return {
  //       status: true,
  //       statusCode: HttpStatus.OK,
  //       message: 'Blog fetched successfully',
  //       data,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }
}