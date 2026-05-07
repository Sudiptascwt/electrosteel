// all_pages_banner_image.controller.ts
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
  Patch,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AllBannerService } from './all_pages_banner_image.service';
import { AllBannerDto } from '../../dto/all_page_banner_image.dto';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('page-key-value')
export class AllBannerController {
  constructor(private readonly allBannerService: AllBannerService) {}

  // CREATE - POST /page-key-value
  @Post()
  async create(@Body() createDto: AllBannerDto) {
    try {
      const data = await this.allBannerService.create(createDto);
      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        message: 'Page meta created successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // GET ALL - GET /page-key-value
  @Get()
  async findAll() {
    try {
      const data = await this.allBannerService.findAll();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Page meta fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // GET BY ID - GET /page-key-value/id/:id
  @Get('id/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      const data = await this.allBannerService.findById(id);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Page meta fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // GET BY PAGE NAME - GET /page-key-value/page-name/:page_name
  @Get('page-name/:page_name')
  async findByPageName(@Param('page_name') page_name: string) {
    try {
      if (!page_name) {
        throw new BadRequestException('page_name is required');
      }
      const data = await this.allBannerService.findByPageName(page_name);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Page meta fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // UPDATE BY ID - POST /page-key-value/update-by-id/:id
  @Post('update-by-id/:id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: AllBannerDto,
  ) {
    try {
      const data = await this.allBannerService.update(id, updateDto);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Page meta updated successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // UPDATE BY PAGE NAME - POST /page-key-value/update-by-pagename
  @Post('update-by-pagename')
  async updateByPageName(@Body() updateDto: AllBannerDto) {
    try {
      const { page_name } = updateDto;
      
      if (!page_name) {
        throw new BadRequestException('page_name is required for update');
      }
      
      const data = await this.allBannerService.updateByPageName(page_name, updateDto);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Page meta updated successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // UPDATE BY PAGE NAME (via URL parameter) - POST /page-key-value/update-by-pagename/:page_name
  @Post('update-by-pagename/:page_name')
  async updateByPageNameParam(
    @Param('page_name') page_name: string,
    @Body() updateDto: AllBannerDto,
  ) {
    try {
      if (!page_name) {
        throw new BadRequestException('page_name is required');
      }
      
      const data = await this.allBannerService.updateByPageName(page_name, updateDto);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Page meta updated successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // DELETE BY ID - DELETE /page-key-value/delete-by-id/:id
  @Delete('delete-by-id/:id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.allBannerService.delete(id);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Page meta deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // DELETE BY PAGE NAME - DELETE /page-key-value/delete-by-pagename/:page_name
  @Delete('delete-by-pagename/:page_name')
  async deleteByPageName(@Param('page_name') page_name: string) {
    try {
      if (!page_name) {
        throw new BadRequestException('page_name is required');
      }
      await this.allBannerService.deleteByPageName(page_name);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: `Page "${page_name}" deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // FIND BY PAGE NAME (POST method for backward compatibility) - POST /page-key-value/find-by-pagename
  @Post('find-by-pagename')
  async findByPageNamePost(@Body() body: { page_name: string }) {
    try {
      const { page_name } = body;
      if (!page_name) {
        throw new BadRequestException('page_name is required');
      }
      const data = await this.allBannerService.findByPageName(page_name);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Page banner fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}