import {
  Controller,
  Get,
  Param,
  Query,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { frontendProductService } from './products.service';

@Controller('frontend/products')
export class frontendProductController {
  constructor(private readonly service: frontendProductService) {}

  @Get('other-products-all')
  async findProductsByCategory(
      @Query('category') category: string,
      @Query('exact') exact?: string
  ) {
      try {
          if (!category) {
              throw new BadRequestException('Category is required');
          }
          
          // ✅ Call service method - NO database logic here
          const data = await this.service.findProductsByCategory(category, exact);
          
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

  @Get(':sectionType')
  async getData(
    @Param('sectionType') sectionType: string,
    @Query('id') id?: string,
  ) {
    const validSections = [
      'overview',
      'productDetails',
      'application',
      'jointingSystems',
      'protectionInternal',
      'protectionExternal',
      'ductile_iron_pipes',
    ];

    if (!validSections.includes(sectionType)) {
      throw new BadRequestException(`Invalid section type: ${sectionType}`);
    }

    const numericId = id ? parseInt(id, 10) : undefined;

    if (sectionType === 'ductile_iron_pipes') {
      return this.service.getData('all', numericId);
    }

    return this.service.getData(sectionType, numericId);
  }

  // FIND BY CATEGORY - POST /AllProducts/find-by-category (RECOMMENDED - SIMPLE)
  @Get('product/find-by-category/:category')
  async findBlogByCategoryGet(@Param('category') category: string) {
    try {
      if (!category) {
        throw new BadRequestException('Category is required');
      }
      
      const data = await this.service.findBlogByName(category);
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