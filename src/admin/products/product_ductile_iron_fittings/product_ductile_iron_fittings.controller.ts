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
import { ProductDuctileIronFittingsService } from './product_ductile_iron_fittings.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DuctileIronFittingsOverviewDto } from 'src/dto/ductile_iron_fittings_overview.dto';
import { DuctileIronFittingsDetailsDto } from 'src/dto/ductile_iron_fittings_details.dto';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('product/ductile-iron-fittings')
export class ProductDuctileIronFittingsController {
  constructor(private readonly productService: ProductDuctileIronFittingsService) {}

  // CREATE
  @Post('overview')
  async createOverview(@Body() createDto: DuctileIronFittingsOverviewDto) {
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
    @Body() updateDto: DuctileIronFittingsOverviewDto,
  ) {
    return await this.productService.updateOverview(id, updateDto);
  }

  // DELETE
  @Delete('overview/:id')
  async deleteOverview(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.deleteOverview(id);
  }

   ///////////////////////////////details///////////////////////////////////
    // CREATE
    @Post('details')
    async createDetails(@Body() createDto: DuctileIronFittingsDetailsDto) {
      return await this.productService.createDetails(createDto);
    }
  
    // GET ALL
    @Get('details')
    async findAllDetails() {
      return await this.productService.findAllDetails();
    }
  
    // GET BY ID
    @Get('details/:id')
    async findDetailsById(@Param('id', ParseIntPipe) id: number) {
      return await this.productService.findDetailsById(id);
    }
  
    // UPDATE
    @Put('details/:id')
    async updateDetails(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto: DuctileIronFittingsDetailsDto,
    ) {
      return await this.productService.updateDetails(id, updateDto);
    }
  
    // DELETE
    @Delete('details/:id')
    async deleteDetails(@Param('id', ParseIntPipe) id: number) {
      return await this.productService.deleteDetails(id);
    }
    ///////////////// application//////////////////
    // // CREATE
    // @Post('applications')
    // async createApplication(@Body() createDto: DuctileIronPipeApplicationsDto) {
    //   return await this.productService.createApplication(createDto);
    // }
  
    // // GET ALL
    // @Get('applications')
    // async findAllApplications() {
    //   return await this.productService.findAllApplications();
    // }
  
    // // GET BY ID
    // @Get('applications/:id')
    // async findApplicationById(@Param('id', ParseIntPipe) id: number) {
    //   return await this.productService.findApplicationById(id);
    // }
  
    // // UPDATE
    // @Put('applications/:id')
    // async updateApplication(
    //   @Param('id', ParseIntPipe) id: number,
    //   @Body() updateDto: DuctileIronPipeApplicationsDto,
    // ) {
    //   return await this.productService.updateApplication(id, updateDto);
    // }
  
    // // DELETE
    // @Delete('applications/:id')
    // async deleteApplication(@Param('id', ParseIntPipe) id: number) {
    //   return await this.productService.deleteApplication(id);
    // }
  
    // ///////////////// pipes jointing//////////////////
    // // CREATE
    // @Post('pipe-jointing')
    // async createPipeJointing(@Body() createDto: PipesJointingDto) {
    //   return await this.productService.createPipeJointing(createDto);
    // }
  
    // // GET ALL
    // @Get('pipe-jointing')
    // async findAllPipeJointings() {
    //   return await this.productService.findAllPipeJointings();
    // }
  
    // // GET BY ID
    // @Get('pipe-jointing/:id')
    // async findPipeJointingById(@Param('id', ParseIntPipe) id: number) {
    //   return await this.productService.findPipeJointingById(id);
    // }
  
    // // UPDATE
    // @Put('pipe-jointing/:id')
    // async updatePipeJointing(
    //   @Param('id', ParseIntPipe) id: number,
    //   @Body() updateDto: PipesJointingDto,
    // ) {
    //   return await this.productService.updatePipeJointing(id, updateDto);
    // }
  
    // // DELETE
    // @Delete('pipe-jointing/:id')
    // async deletePipeJointing(@Param('id', ParseIntPipe) id: number) {
    //   return await this.productService.deletePipeJointing(id);
    // }
}

