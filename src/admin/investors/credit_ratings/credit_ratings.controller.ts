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
import { CreditRatingsService } from './credit_ratings.service';
import { CreditRatingsDto } from '../../../dto/credit_ratings.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('credit-ratings')
export class CreditRatingsController {
  constructor(private readonly CreditRatingsService: CreditRatingsService) {}

  ///////CreditRatings///////////
  // CREATE
  @Post()
  async create(@Body() createDto: CreditRatingsDto) {
    const data = await this.CreditRatingsService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.CreditRatingsService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.CreditRatingsService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: CreditRatingsDto,
  ) {
    const data = await this.CreditRatingsService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.CreditRatingsService.delete(id);
  }
}
export { CreditRatingsService };

