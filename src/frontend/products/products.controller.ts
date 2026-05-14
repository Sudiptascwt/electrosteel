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

  @Get('di-valves/all')
  async getAllDIValvesSections() {
    try {
      const data = await this.service.getAllDIValvesData();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'DI Valves all sections fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('paint-fac/all')
    async getAllPaintCategories() {
        try {
            const data = await this.service.getAllPaintCategories();
            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: 'All paint categories fetched successfully',
                data,
            };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    } 

  @Get('cast-iron-pipes/all')
  async getAllCastIronPipesSections() {
    try {
      const data = await this.service.getAllCastIronPipesData();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Cast Iron Pipes all sections fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('ductile-iron-flange-pipe/all')
  async getAllDuctileIronFlangePipeSections() {
    try {
      const data = await this.service.getAllDuctileIronFlangePipeData();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Ductile Iron Flange Pipe all sections fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //   @Get('other-products-all')
  // async findProductsByCategory(
  //     @Query('category') category: string,
  //     @Query('exact') exact?: string
  // ) {
  //     try {
  //         if (!category) {
  //             throw new BadRequestException('Category is required');
  //         }
          
  //         const data = await this.service.findProductsByCategory(category, exact);
          
  //         return {
  //             status: true,
  //             statusCode: HttpStatus.OK,
  //             message: 'Products fetched successfully',
  //             data,
  //         };
  //     } catch (error) {
  //         throw new BadRequestException(error.message);
  //     }
  // }

  // ✅ Ductile Iron Fittings - NEW
  @Get('ductile-iron-fittings/all')
  async getAllDuctileIronFittingsSections() {
    try {
      const data = await this.service.getAllDuctileIronFittingsData();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Ductile Iron Fittings all sections fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Rubber Products - NEW
  @Get('rubber-products/all')
  async getAllRubberProductsSections() {
    try {
      const data = await this.service.getAllRubberProductsData();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Rubber Products all sections fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Other Products - NEW
  @Get('other-products/all')
  async getAllOtherProductsSections() {
    try {
      const data = await this.service.getAllOtherProductsData();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Other Products all sections fetched successfully',
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
      @Query('category') category?: string,  // Add category as query param
  ) {
      const validSections = [
          'overview',
          'productDetails',
          'application',
          'jointingSystems',
          'protectionInternal',
          'protectionExternal',
          'ductile-iron-pipes',
      ];

      if (!validSections.includes(sectionType)) {
          throw new BadRequestException(`Invalid section type: ${sectionType}`);
      }

      const numericId = id ? parseInt(id, 10) : undefined;
      const categoryFilter = category || 'ductile-iron-pipes';  // Default category

      if (sectionType === 'ductile-iron-pipes') {
          return this.service.getData('all', numericId, categoryFilter);
      }

      return this.service.getData(sectionType, numericId, categoryFilter);
  }
  
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