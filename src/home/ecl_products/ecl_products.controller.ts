import { Controller, Post, Get, Delete, Body, Param, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ecl_productsService } from './ecl_products.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { UserRole } from 'src/admin/users/user.entity';
import { Roles } from 'src/role/roles.decorator';

@Controller('home/ecl-products')
export class ecl_productsController {
  constructor(private readonly slidesService: ecl_productsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('save-ecl-products')
  saveecl_products(@Body() body: any) {
    return this.slidesService.saveecl_products({
      ...body
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAllecl_products() {
    return this.slidesService.getAllecl_products();
  }
}