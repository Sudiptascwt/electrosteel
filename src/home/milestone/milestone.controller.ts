// src/admin/milestone/milestone.controller.ts
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MilestoneService } from './milestone.service';
import { MilestoneDto } from '../../dto/milestone.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';
import { MilestoneTitleDto } from '../../dto/milestone_title.dto'

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('home/milestone')
export class MilestoneController {
  constructor(private readonly milestoneService: MilestoneService) {}

  // Create group with children
  @Post('create-milestone')
  async createMilestone(@Body() data: MilestoneTitleDto) {
    return this.milestoneService.createMilestone(data);
  }

  // Update a group by id (replaces child list)
  @Put('update-milestone/:id')
  async updateMilestone(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: MilestoneTitleDto,
  ) {
    return this.milestoneService.updateMilestoneGroup(id, data);
  }

  // Get all groups (with milestones)
  @Get()
  async getAll() {
    return this.milestoneService.getAllMilestoneGroups();
  }

  // Get single group by id
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.milestoneService.getMilestoneGroupById(id);
  }

  // Delete group by id
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.milestoneService.deleteMilestoneGroup(id);
  }
}
