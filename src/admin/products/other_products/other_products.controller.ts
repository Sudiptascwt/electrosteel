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
import { OtherProductsService } from './other_products.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OtherProductsDto } from 'src/dto/other_products.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('product/OtherProducts')
export class OtherProductsController {
  constructor(private readonly productService: OtherProductsService) {}

  // CREATE
  @Post()
  async createOtherProduct(@Body() createDto: OtherProductsDto) {
    return await this.productService.createOtherProduct(createDto);
  }

  // GET ALL
  @Get()
  async findAllOtherProducts() {
    return await this.productService.findAllOtherProducts();
  }

  // GET BY ID
  @Get(':id')
  async findOtherProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOtherProductById(id);
  }

  // UPDATE
  @Put(':id')
  async updateOtherProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: OtherProductsDto,
  ) {
    return await this.productService.updateOtherProduct(id, updateDto);
  }

  // DELETE
  @Delete(':id')
  async deleteOtherProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.deleteOtherProduct(id);
  }
}

