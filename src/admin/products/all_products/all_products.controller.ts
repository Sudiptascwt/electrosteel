// AllProducts.controller.ts
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
  Query,
} from '@nestjs/common';
import { AllProductsService } from './all_products.service';
import { AllProductsDto } from '../../../dto/all_products.dto';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('all-products')
export class AllProductsController {
  constructor(private readonly AllProductsService: AllProductsService) {}


  @Get('products')
  async findProductsByCategory(
      @Query('category') category: string,
      @Query('exact') exact?: string
  ) {
      try {
          if (!category) {
              throw new BadRequestException('Category is required');
          }
          
          // ✅ Call service method - NO database logic here
          const data = await this.AllProductsService.findProductsByCategory(category, exact);
          
          return {
              status: true,
              statusCode: HttpStatus.OK,
              message: 'Products fetched successfully',
              data,
          };
      } catch (error) {
          throw new BadRequestException(error.message);
      }
  }
  
  // CREATE - POST /AllProducts
  @Post()
  async create(@Body() createDto: AllProductsDto) {
    try {
      const data = await this.AllProductsService.create(createDto);
      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        message: 'Product updated successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // GET ALL - GET /AllProducts
  @Get()
  async findAll() {
    try {
      const data = await this.AllProductsService.findAll();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'All Products fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // GET BY ID - GET /AllProducts/:id
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.AllProductsService.findById(id);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Product fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // UPDATE - PUT /AllProducts/:id
  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: AllProductsDto,
  ) {
    try {
      const data = await this.AllProductsService.update(id, updateDto);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Product updated successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // // DELETE - DELETE /all-products/category/:category (MUST BE FIRST)
  // @Delete('category/:category')
  // async deleteByCategory(@Param('category') category: string) {
  //   try {
  //     await this.AllProductsService.deleteByCategory(category);
  //     return {
  //       status: true,
  //       statusCode: HttpStatus.OK,
  //       message: `Product(s) with category "${category}" deleted successfully`,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // DELETE - DELETE /all-products?id=123
  // DELETE - DELETE /all-products?category=PaintOverview
  @Delete()
  async delete(@Query('id') id?: string, @Query('category') category?: string) {
    try {
      if (category) {
        await this.AllProductsService.deleteByCategory(category);
        return {
          status: true,
          statusCode: HttpStatus.OK,
          message: `Product(s) with category "${category}" deleted successfully`,
        };
      } else if (id) {
        await this.AllProductsService.delete(parseInt(id));
        return {
          status: true,
          statusCode: HttpStatus.OK,
          message: 'Product deleted successfully',
        };
      } else {
        throw new BadRequestException('Either id or category must be provided');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // FIND BY CATEGORY - POST /AllProducts/find-by-category (RECOMMENDED - SIMPLE)
  @Get('product/find-by-category/:category')
  async findBlogByCategoryGet(@Param('category') category: string) {
    try {
      if (!category) {
        throw new BadRequestException('Category is required');
      }
      
      const data = await this.AllProductsService.findBlogByName(category);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Product fetched successfully',
        data,  // This will be an array of AllProducts
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}