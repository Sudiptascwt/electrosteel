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
import { InvestorDocumentsService } from './investor_documents.service';
import { InvestorDocumentsDto } from '../../../dto/investor_documents.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('investor-documents')
export class InvestorDocumentsController {
  constructor(private readonly InvestorDocumentsService: InvestorDocumentsService) {}

  ///////InvestorDocuments///////////
  // CREATE
  @Post()
  async create(@Body() createDto: InvestorDocumentsDto) {
    const data = await this.InvestorDocumentsService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.InvestorDocumentsService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.InvestorDocumentsService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: InvestorDocumentsDto,
  ) {
    const data = await this.InvestorDocumentsService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.InvestorDocumentsService.delete(id);
  }
}
export { InvestorDocumentsService };

