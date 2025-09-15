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
import { ProductTypeService } from './product_type.service';
import { ProductTypeDto } from '../../dto/product_type.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)

@Controller('product/applications')
export class ProductTypeController {
  constructor(private readonly productAppService: ProductTypeService) {}

  // CREATE
  @Post('create-applications')
  create(@Body() createDto: ProductTypeDto) {
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
    @Body() updateDto: ProductTypeDto,
  ) {
    return this.productAppService.update(id, updateDto);
  }

  // DELETE
  @Delete('delete-application/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productAppService.delete(id);
  }
}
