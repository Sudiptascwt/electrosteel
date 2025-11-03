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
import { UnclaimedDividendsService } from './unclaimed_dividends.service';
import { UnclaimedDividendsDto } from '../../../dto/unclaimed_dividends.dto';
import { UnclaimedDividendsImagesDto } from 'src/dto/unclaimed_dividends_images.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('unclamied-dividends')
export class UnclaimedDividendsController {
  constructor(private readonly UnclaimedDividendsService: UnclaimedDividendsService) {}

  ///////UnclaimedDividends///////////
  // CREATE
  @Post()
  async create(@Body() createDto: UnclaimedDividendsDto) {
    const data = await this.UnclaimedDividendsService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.UnclaimedDividendsService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.UnclaimedDividendsService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UnclaimedDividendsDto,
  ) {
    const data = await this.UnclaimedDividendsService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.UnclaimedDividendsService.delete(id);
  }
}
export { UnclaimedDividendsService };

