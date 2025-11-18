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
import { MilestoneDto } from '../../dto/milestone.dto';
import { MilestoneImageDto } from '../../dto/milestone_image.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { get } from 'http';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../role/roles.guard';
import { Roles } from '../../role/roles.decorator';
import { UserRole } from '../../admin/users/user.entity';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
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


  //////milestone image upload//
  @Post('add-milestone-image')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  async addMilestoneImage(
    @Param('id') id: number,
    @Body() dto: MilestoneImageDto,
    @UploadedFiles() files?: { image?: Express.Multer.File[] }, // optional
  ) {
    const file = files?.image?.[0] ?? null;  
    return this.MilestoneService.addMilestoneImage(dto, file);
  }


  @Put('update-milestone-image/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]),
  )
  async updateMilestoneImage(
    @Param('id') id: number,
    @UploadedFiles() files?: { image?: Express.Multer.File[] },  
  ) {
    const image = files?.image?.[0] ?? null;  
    return this.MilestoneService.updateMilestoneImage(id, image);
  }

  @Get('all-milestone-images')
  async getAllMilestoneImages() {
    return this.MilestoneService.getAllMilestoneImages();
  }


  @Get('get-milestone-image/:id')
  async getMilestoneImageById(@Param('id') id: number) { 
    return this.MilestoneService.getMilestoneImageById(id);
  } 

  @Delete('milestone-image/:id')
  async deleteMilestoneImage(@Param('id') id: number) {
    return this.MilestoneService.deleteMilestoneImage(id);
  }
}