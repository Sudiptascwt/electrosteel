import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDuctileIronService } from './product_ductile_iron_pipes.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DuctileIronPipesOverviewDto } from 'src/dto/ductile_iron_pipes_overview.dto';
import { DuctileIronDetailsDto } from 'src/dto/ductile_iron_pipes_details.dto';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('product/ductile-iron-pipes')
export class ProductDuctileIronController {
  constructor(private readonly productService: ProductDuctileIronService) {}

  // CREATE
  @Post('overview')
  async createOverview(@Body() createDto: DuctileIronPipesOverviewDto) {
    return await this.productService.createOverview(createDto);
  }

  // GET ALL
  @Get('overview')
  async findAllOverviews() {
    return await this.productService.findAllOverviews();
  }

  // GET BY ID
  @Get('overview/:id')
  async findOverviewById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOverviewById(id);
  }

  // UPDATE
  @Put('overview/:id')
  async updateOverview(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: DuctileIronPipesOverviewDto,
  ) {
    return await this.productService.updateOverview(id, updateDto);
  }

  // DELETE
  @Delete('overview/:id')
  async deleteOverview(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.deleteOverview(id);
  }

  ///////////////////////////////applications///////////////////////////////////
  // CREATE
  @Post('details')
  async createApplication(@Body() createDto: DuctileIronDetailsDto) {
    return await this.productService.createDetails(createDto);
  }

  // GET ALL
  @Get('details')
  async findAllApplications() {
    return await this.productService.findAllDetails();
  }

  // GET BY ID
  @Get('details/:id')
  async findApplicationById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findDetailsById(id);
  }

  // UPDATE
  @Put('details/:id')
  async updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: DuctileIronDetailsDto,
  ) {
    return await this.productService.updateDetails(id, updateDto);
  }

  // DELETE
  @Delete('details/:id')
  async deleteApplication(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.deleteDetails(id);
  }

}

