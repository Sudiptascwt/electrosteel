// src/global_presence/global_presence.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { global_presenceService } from './global_presence.service';
import { globalPresence } from 'src/entity/global_presence.entity';
import { globalPresenceDto } from 'src/dto/global_presence.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('global-presence')
export class OfficeController {
  constructor(private readonly officeService: global_presenceService) {}

  // Create/Update with heading, sub_heading, unique_id and data array
  @Post('office/upsert')
  async upsert(@Body() upsertDto: any) {
    try {
      const data = await this.officeService.upsertWithMeta(upsertDto);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Global Presence saved successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Get by unique_id
  @Get('office/unique/:unique_id')
  async findByUniqueId(@Param('unique_id') unique_id: string) {
    try {
      const data = await this.officeService.findByUniqueId(unique_id);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Global Presence data fetched successfully',
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  // Get all grouped by unique_id
  @Get('office/all-groups')
  async getAllGroups() {
    try {
      const data = await this.officeService.getAllGroups();
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'All Global Presence data fetched successfully',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Filter offices
  @Get('office/filter')
  async filterOffices(
    @Query('category') category?: string,
    @Query('direction') direction?: string,
    @Query('unique_id') unique_id?: string
  ) {
    try {
      const data = await this.officeService.filterOffices(category, direction, unique_id);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Offices fetched successfully',
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  // Delete by unique_id
  @Delete('office/unique/:unique_id')
  async deleteByUniqueId(@Param('unique_id') unique_id: string) {
    try {
      await this.officeService.deleteByUniqueId(unique_id);
      return {
        status: true,
        statusCode: HttpStatus.OK,
        message: `Data with unique_id "${unique_id}" deleted successfully`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}