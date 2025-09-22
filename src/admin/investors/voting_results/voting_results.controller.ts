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
import { VotingResultsService } from './voting_results.service';
import { VotingResultsDto } from '../../../dto/voting_results.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller('voting-results')
export class VotingResultsController {
  constructor(private readonly VotingResultsService: VotingResultsService) {}

  ///////VotingResults///////////
  // CREATE
  @Post()
  async create(@Body() createDto: VotingResultsDto) {
    const data = await this.VotingResultsService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.VotingResultsService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.VotingResultsService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: VotingResultsDto,
  ) {
    const data = await this.VotingResultsService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.VotingResultsService.delete(id);
  }
}
export { VotingResultsService };

