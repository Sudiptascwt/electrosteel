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
import { DisclosuresService } from './disclosures.service';
import { DisclosureDto } from '../../../dto/disclosure.dto';
import { DisclosureImagesDto } from 'src/dto/disclosure_images.dto';
import { OtherDisclosureDto } from 'src/dto/other_disclosures.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../role/roles.guard';
import { Roles } from '../../../role/roles.decorator';
import { UserRole } from '../../users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
@Controller()
export class DisclosuresController {
  constructor(private readonly DisclosuresService: DisclosuresService) {}

  ///////Disclosures///////////
  // CREATE
  @Post('disclosures')
  async create(@Body() createDto: DisclosureDto) {
    const data = await this.DisclosuresService.create(createDto);
    return data;
  }

  // GET ALL
  @Get('disclosures')
  async findAll() {
    const data = await this.DisclosuresService.findAll();
    return data;
  }

  // GET BY ID
  @Get('disclosures/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.DisclosuresService.findById(id);
    return data;
  }

  // UPDATE
  @Put('disclosures/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: DisclosureDto,
  ) {
    const data = await this.DisclosuresService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete('disclosures:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.DisclosuresService.delete(id);
  }

  ////////////other disclosures///////////////
  // CREATE
  @Post('other-disclosures')
  async createOtherClosure(@Body() createDto: OtherDisclosureDto) {
    const data = await this.DisclosuresService.createOtherClosure(createDto);
    return data;
  }

  // GET ALL
  @Get('other-disclosures')
  async findAllOtherClosures() {
    const data = await this.DisclosuresService.findAllOtherClosures();
    return data;
  }

  // GET BY ID
  @Get('other-disclosures/:id')
  async findOtherClosureById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.DisclosuresService.findOtherClosureById(id);
    return data;
  }

  // UPDATE
  @Put('other-disclosures/:id')
  async updateOtherClosure(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: OtherDisclosureDto,
  ) {
    const data = await this.DisclosuresService.updateOtherClosure(id, updateDto);
    return data;
  }

  // DELETE
  @Delete('other-disclosures/:id')
  async deleteOtherClosure(@Param('id', ParseIntPipe) id: number) {
    return await this.DisclosuresService.deleteOtherClosure(id);
  }
}
export { DisclosuresService };

