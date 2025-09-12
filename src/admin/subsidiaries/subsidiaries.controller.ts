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
import { SubsidiariesService } from './subsidiaries.service';
import { SubsidiariesDto } from '../../dto/subsidiaries.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubsidiariesPageDto } from 'src/dto/subsidiaries_page.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('subsidiaries')
export class SubsidiariesController {
  constructor(private readonly SubsidiariesService: SubsidiariesService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: SubsidiariesDto) {
    const data = await this.SubsidiariesService.create(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Subsidiaries created successfully',
      data,
    };
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.SubsidiariesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'All Subsidiariess fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SubsidiariesService.findById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Subsidiaries fetched successfully',
      data,
    };
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SubsidiariesDto,
  ) {
    const data = await this.SubsidiariesService.update(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Subsidiaries updated successfully',
      data,
    };
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.SubsidiariesService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Subsidiaries deleted successfully',
    };
  }




  /////////////subsidiaries page///////////////
  // CREATE
  @Post()
  async createSubsdiariesPage(@Body() createDto: SubsidiariesPageDto) {
    const data = await this.SubsidiariesService.createSubsdiariesPage(createDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Subsidiaries page created successfully',
      data,
    };
  }

  // GET ALL
  @Get()
  async findAllSubsdiariesPage() {
    const data = await this.SubsidiariesService.findAllSubsdiariesPage();
    return {
      statusCode: HttpStatus.OK,
      message: 'All Subsidiariess pages fetched successfully',
      data,
    };
  }

  // GET BY ID
  @Get(':id')
  async findSubsdiariesPageById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.SubsidiariesService.findSubsdiariesPageById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Subsidiaries page fetched successfully',
      data,
    };
  }

  // UPDATE
  @Put(':id')
  async updateSubsdiariesPage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SubsidiariesPageDto,
  ) {
    const data = await this.SubsidiariesService.updateSubsdiariesPage(id, updateDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Subsidiaries page updated successfully',
      data,
    };
  }

  // DELETE
  @Delete(':id')
  async deleteSubsdiariesPage(@Param('id', ParseIntPipe) id: number) {
    await this.SubsidiariesService.deleteSubsdiariesPage(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Subsidiaries page deleted successfully',
    };
  }
}
