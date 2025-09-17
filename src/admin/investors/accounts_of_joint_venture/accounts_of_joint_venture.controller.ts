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
import { AccountOfJointVentureService } from './accounts_of_joint_venture.service';
import {AccountOfJointVentureDto} from '../../../dto/accounts_of_joint_venture.dto';

@Controller('accounts-of-joint-venture')
export class AccountOfJointVentureController {
  constructor(private readonly AccountOfJointVentureService: AccountOfJointVentureService) {}

  // CREATE
  @Post()
  async create(@Body() createDto: AccountOfJointVentureDto) {
    const data = await this.AccountOfJointVentureService.create(createDto);
    return data;
  }

  // GET ALL
  @Get()
  async findAll() {
    const data = await this.AccountOfJointVentureService.findAll();
    return data;
  }

  // GET BY ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.AccountOfJointVentureService.findById(id);
    return data;
  }

  // UPDATE
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: AccountOfJointVentureDto,
  ) {
    const data = await this.AccountOfJointVentureService.update(id, updateDto);
    return data;
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.AccountOfJointVentureService.delete(id);

  }
}
