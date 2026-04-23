import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductInnovationService } from './product_innovation.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserRole } from '../../users/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('about/product-innovation')
export class ProductInnovationController {
  constructor(private readonly productInnovationService: ProductInnovationService) {}

  @Get(':section')
  async getSection(@Param('section') section: string) {
    return this.productInnovationService.getSection(section);
  }

  @Post(':section')
  async saveOrUpdateSection(
    @Param('section') section: string,
    @Body() body: any,
  ) {
    return this.productInnovationService.saveOrUpdateSection(section, body);
  }
}