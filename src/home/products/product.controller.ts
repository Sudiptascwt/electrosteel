import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Put,
  Param,
  Get,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from '../../dto/product.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { get } from 'http';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';
import { bannerMulterOptions  } from '../../common/multer_config';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  // Create Product
  @Post('create-product')
  async createProduct(@Body() data: ProductDto) {
    return this.ProductService.createProduct(data);
  }

  @Put('update-product/:id')
  async updateProduct(@Param('id') id: number, @Body() data: ProductDto) {
    return this.ProductService.updateProduct(id, data);
  }

  //get all Products
  @Get()
  async getAllProducts() {
      return this.ProductService.getAllProducts();
  }
  //get Product by id
  @Get(':id')
  async getOne(@Param('id') id: number) {
      return this.ProductService.getProductById(id);
  }
    
  //delete Product by id
  @Delete(':id')
  async delete(@Param('id') id: number) {
      return this.ProductService.deleteProduct(id);
  }
}