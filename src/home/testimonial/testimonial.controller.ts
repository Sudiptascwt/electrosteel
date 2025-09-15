import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { TestimonialDto } from '../../dto/home_testimonial.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/video-section')
export class   TestimonialController {
  constructor(private readonly service:  TestimonialService) {}

  @Post('create-video-section')
  async create(@Body() data:   TestimonialDto) {
    return this.service.create(data);
  }

  @Put('update-video-section/:id')
  async update(@Param('id') id: number, @Body() data: Partial<  TestimonialDto>) {
    return this.service.update(id, data);
  }

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
