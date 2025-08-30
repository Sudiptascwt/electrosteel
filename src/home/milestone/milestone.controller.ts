import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { MilestoneDto } from '../dto/milestone.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('home/milestone')
export class MilestoneController {
  constructor(private readonly MilestoneService: MilestoneService) {}

  @Post('create-milestone')
  async createMilestone(
    @Body() data: MilestoneDto,
  ) {
    return this.MilestoneService.createMilestone(data);
  }

  @Put('update-milestone/:id')
  async updateMilestone(
    @Param('id') id: number,
    @Body() data: MilestoneDto,
  ) {
    return this.MilestoneService.updateMilestone(id, data);
  }
    //get all Milestones
    @Get()
    async getAllMilestones() {
        return this.MilestoneService.getAllMilestones();
    }
    //get Milestone by id
    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.MilestoneService.getMilestoneById(id);
    }
    
    //delete Milestone by id
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.MilestoneService.deleteMilestone(id);
    }
}