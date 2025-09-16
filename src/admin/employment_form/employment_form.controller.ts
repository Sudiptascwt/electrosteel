import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EmploymentFormService } from './employment_form.service';
import { EmploymentFormDto } from '../../dto/employment_form.dto'
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller() // <-- No prefix here (important)
export class EmploymentFormController {
  constructor(
    private readonly EmploymentFormService: EmploymentFormService,
  ) {}

  @Post('employment-form')
  async createContact(@Body() createDto: EmploymentFormDto) {
    return this.EmploymentFormService.create(createDto);
  }

  @Get('employment-form')
  async findAllContacts() {
    return this.EmploymentFormService.findAll();
  }

  @Get('employment-form/:id')
  async findContactById(@Param('id', ParseIntPipe) id: number) {
    return this.EmploymentFormService.findById(id);
  }

  @Put('employment-form/:id')
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: EmploymentFormDto,
  ) {
    return this.EmploymentFormService.update(id, updateDto);
  }

  @Delete('employment-form/:id')
  async deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.EmploymentFormService.delete(id);
  }
}
