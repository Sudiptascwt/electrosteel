import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { MilestoneDto } from '../../dto/milestone.dto';
import { Milestone } from '../../entity/milestone.entity';
import { MilestoneImageDto } from '../../dto/milestone_image.dto';
import { MilestoneImage } from '../../entity/milestone_image.entity';

@Injectable()
export class MilestoneService {
    constructor(
    @InjectRepository(Milestone)
    private readonly MilestoneRepository: Repository<Milestone>, 
    @InjectRepository(MilestoneImage)
    private readonly MilestoneImageRepository: Repository<MilestoneImage>, 
  ) {}

  async createMilestone(data: MilestoneDto) {
    const existingYearMilestone = await this.MilestoneRepository.findOne({
      where: { year: data.year },
    });

    const newMilestone = this.MilestoneRepository.create(data);
    await this.MilestoneRepository.save(newMilestone);

    return {
      status: true,
      statusCode: 201,
      message: 'Milestone created successfully.',
      data: newMilestone,
    };
  }

  // UPDATE CARE
  async updateMilestone(id: number, data: MilestoneDto) {
    const milestone = await this.MilestoneRepository.findOne({ where: { id } });

    if (!milestone) {
      throw new NotFoundException({
          message: `Milestone with ID ${id} not found`,
          error: 'Not Found',
          statusCode: 404,
          status: false
      });
    }

    Object.assign(milestone, data);

    const updatedMilestone = await this.MilestoneRepository.save(milestone);

    return {
      status: true,
      statusCode: 200,
      message: 'Milestone updated successfully.',
      data: updatedMilestone,
    };
  }

  // GET SINGLE CARE
  async getMilestoneById(id: number) {
    const milestone = await this.MilestoneRepository.findOne({ where: { id } });

    if (!milestone) {
      throw new NotFoundException({
        message: `Milestone with ID ${id} not found`,
        error: 'Not Found',
        statusCode: 404,
        status: false
      });
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Milestone fetched successfully.',
      data: milestone,
    };
  }

  // GET ALL CARES
  async getAllMilestones() {
    const milestones = await this.MilestoneRepository.find({
      order: { createdAt: 'DESC' },
    });

    return {
      status: true,
      statusCode: 200,
      message: 'Milestones fetched successfully.',
      data: milestones,
    };
  }

  async deleteMilestone(id: number) {
    const result = await this.MilestoneRepository.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException({
        message: `Milestone with ID ${id} not found`,
        error: 'Not Found',
        statusCode: 404,
        status: false
      });
    }
    return {
      status: true,
      statusCode: 200,
      message: 'Milestone deleted successfully',
    };
  }

  /////milestone image upload//
  async addMilestoneImage(data: MilestoneImageDto, image: Express.Multer.File) {
    const existingYearMilestoneTitle = await this.MilestoneImageRepository.findOne({
      where: { title: data.title },
    });

    const newMilestoneImage = this.MilestoneImageRepository.create(data);
    await this.MilestoneImageRepository.save(newMilestoneImage);

    return {
      status: true,
      statusCode: 201,
      message: 'Milestone Image created successfully.',
      data: newMilestoneImage,
    };
  }

  //update milestone image

  async updateMilestoneImage(id: number, image: Express.Multer.File) {
    const milestone = await this.MilestoneImageRepository.findOne({ where: { id } }); 
    if (!milestone) {
      throw new NotFoundException({
        message: `Milestone with ID ${id} not found`,
        error: 'Not Found',
        statusCode: 404,
        status: false
      });
    }
    milestone.image = image ? image.filename : milestone.image;
    await this.MilestoneRepository.save(milestone);
    return {
      status: true,
      statusCode: 200,
      message: 'Milestone image updated successfully',
      data: milestone,
    };
  }


  // GET SINGLE CARE
  async getMilestoneImageById(id: number) {
    const milestone = await this.MilestoneImageRepository.findOne({ where: { id } });

    if (!milestone) {
      throw new NotFoundException({
        message: `Milestone with ID ${id} not found`,
        error: 'Not Found',
        statusCode: 404,
        status: false
      });
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Milestone fetched successfully.',
      data: milestone,
    };
  }

  // GET ALL CARES
  async getAllMilestoneImages() {
    const milestones = await this.MilestoneImageRepository.find({
      order: { createdAt: 'DESC' },
    });

    return {
      status: true,
      statusCode: 200,
      message: 'Milestones fetched successfully.',
      data: milestones,
    };
  }

  async deleteMilestoneImage(id: number) {
    const result = await this.MilestoneImageRepository.delete(id);
    if (result.affected == 0){
      throw new NotFoundException({
        message: `Milestone with ID ${id} not found`,
        error: 'Not Found',
        statusCode: 404,
        status: false
      });
    } 
    return {
      status: true,
      statusCode: 200,
      message: 'Milestone deleted successfully',
    };
  }
}