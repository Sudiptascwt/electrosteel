import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FrontendBlogsService } from './blogs.service';

@Controller('frontend/blogs')
export class FrontendBlogsController {
  constructor(private readonly SubsidiariesService: FrontendBlogsService) {}

  @Get()
  async getBlogsData(
      @Query('category') category?: string,  // category as query parameter
      @Query('page') page?: string,
      @Query('limit') limit?: string,
      @Query('year') year?: string,
      @Query('month') month?: string,
      @Query('keywords') keywords?: string
  ) {
      try {
          const pageNum = page ? parseInt(page, 10) : 1;
          const limitNum = limit ? parseInt(limit, 10) : 10;
          const yearNum = year ? parseInt(year, 10) : undefined;
          const monthNum = month ? parseInt(month, 10) : undefined;
          
          // Validate month range
          if (monthNum && (monthNum < 1 || monthNum > 12)) {
              throw new BadRequestException('Month must be between 1 and 12');
          }
          
          // Validate page and limit
          if (pageNum < 1) throw new BadRequestException('Page must be greater than 0');
          if (limitNum < 1 || limitNum > 100) throw new BadRequestException('Limit must be between 1 and 100');
          
          // Validate category
          if (!category) {
              throw new BadRequestException('Category is required');
          }
          
          return await this.SubsidiariesService.getBlogsData(
              category, 
              pageNum, 
              limitNum, 
              yearNum, 
              monthNum, 
              keywords
          );
      } catch (error) {
          throw new BadRequestException(error.message);
      }
  }

  @Get('by-slug/:slug')
  async getBlogsDataBySlug(@Param('slug') slug: string){
    return this.SubsidiariesService.getBlogsDataBySlug(slug);
  }
}
