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
import { ProductApplicationsService } from './product.service';
import { ProductApplicationDto } from '../dto/product_application.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../role/roles.guard';
import { Roles } from '../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductApplicationImageDto } from '../dto/product_application_images.dto'

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)

@Controller('product/applications')
export class ProductApplicationsController {
  constructor(private readonly productAppService: ProductApplicationsService) {}

  // CREATE
  @Post('create-applications')
  create(@Body() createDto: ProductApplicationDto) {
    return this.productAppService.create(createDto);
  }

  // GET ALL
  @Get('get-all-applications')
  findAll() {
    return this.productAppService.findAll();
  }

  // GET BY ID
  @Get('get-application/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.productAppService.findById(id);
  }

  // UPDATE
  @Put('update-applications/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: ProductApplicationDto,
  ) {
    return this.productAppService.update(id, updateDto);
  }

  // DELETE
  @Delete('delete-application/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productAppService.delete(id);
  }

  //////application images///////
 
  @Post('create-product-image')
  createApplicationImage(@Body() createDto: ProductApplicationImageDto) {
    return this.productAppService.createApplicationImage(createDto);
  }

  @Get('product-images/all')
  findAllApplicationImages() {
    return this.productAppService.findAllApplicationImages();
  }

  @Get('product-images/:id')
  findApplicationImageById(@Param('id', ParseIntPipe) id: number) {
    return this.productAppService.findApplicationImageById(id);
  }

  @Put('update-product-image/:id')
  updateApplicationImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: ProductApplicationImageDto,
  ) {
    return this.productAppService.updateApplicationImage(id, updateDto);
  }

  @Delete('images/:id')
  deleteApplicationImage(@Param('id', ParseIntPipe) id: number) {
    return this.productAppService.deleteApplicationImage(id);
  }
}
