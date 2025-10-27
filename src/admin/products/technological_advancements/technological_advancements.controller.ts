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
import { TechnologicalAdvancementsService } from './technological_advancements.service';
import { ProductApplicationDto } from '../../../dto/product_application.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../../admin/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Advancement } from 'src/entity/advancement.entity';
import { AdvancementDto } from 'src/dto/advancement.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('product/technological-advancements')
export class TechnologicalAdvancementsController {
  constructor(private readonly productAppService: TechnologicalAdvancementsService) {}

  // GET ALL
  @Get()
  findAll() {
    return this.productAppService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.productAppService.findById(id);
  }
}