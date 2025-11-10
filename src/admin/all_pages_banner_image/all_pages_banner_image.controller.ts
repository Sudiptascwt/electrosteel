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
  BadGatewayException,
} from '@nestjs/common';
import { AllBannerService } from './all_pages_banner_image.service';
import { AllBannerDto } from '../../dto/all_page_banner_image.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('page-key-value')
export class AllBannerController {
  constructor(private readonly AllBannerService: AllBannerService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: AllBannerDto) {
    const data = await this.AllBannerService.create(createDto);
    return {
      status: true,
      statusCode: HttpStatus.CREATED,
      message: 'page meta created successfully',
      data,
    };
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.AllBannerService.findAll();
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'page meta fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.AllBannerService.findById(id);
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'page meta fetched successfully',
      data,
    };
  }

  // UPDATE
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: AllBannerDto,
  ) {
    const data = await this.AllBannerService.update(id, updateDto);
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'page meta updated successfully',
      data,
    };
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.AllBannerService.delete(id);
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'page meta deleted successfully',
    };
  }

  // GET BY page name
  @Get('name/:name')
  async findByPageName(@Param('name') name: string) {
    const data = await this.AllBannerService.findByPageName(name);
    if(data== null){
      return {
        statusCode: BadGatewayException,
        message: 'This page name does not exist.'
      };
    }
    return {
      status: true,
      statusCode: HttpStatus.OK,
      message: 'page meta fetched successfully',
      data,
    };
  }
}
