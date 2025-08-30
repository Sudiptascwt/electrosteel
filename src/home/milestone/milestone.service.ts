import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { MilestoneDto } from '../dto/milestone.dto';
import { Milestone } from '../entity/milestone.entity';

@Injectable()
export class MilestoneService {
    constructor(
    @InjectRepository(Milestone)
    private readonly MilestoneRepository: Repository<Milestone>, 
  ) {}

  async createMilestone(data: MilestoneDto) {
    const existingYearMilestone = await this.MilestoneRepository.findOne({
      where: { year: data.year },
    });

    if (existingYearMilestone) {
      return {
        statusCode: 400,
        message: 'Milestone for this year already exists.',
      };
    }
    const newMilestone = this.MilestoneRepository.create(data);
    await this.MilestoneRepository.save(newMilestone);

    return {
      statusCode: 201,
      message: 'Milestone created successfully.',
      data: newMilestone,
    };
  }

  // UPDATE CARE
  async updateMilestone(id: number, data: MilestoneDto) {
    const milestone = await this.MilestoneRepository.findOne({ where: { id } });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID ${id} not found`);
    }

    Object.assign(milestone, data);

    const updatedMilestone = await this.MilestoneRepository.save(milestone);

    return {
      statusCode: 200,
      message: 'Milestone updated successfully.',
      data: updatedMilestone,
    };
  }

  // GET SINGLE CARE
  async getMilestoneById(id: number) {
    const milestone = await this.MilestoneRepository.findOne({ where: { id } });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID ${id} not found`);
    }

    return {
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
      statusCode: 200,
      message: 'Milestones fetched successfully.',
      data: milestones,
    };
  }

  async deleteMilestone(id: number) {
  const result = await this.MilestoneRepository.delete(id);
  if (result.affected == 0) throw new NotFoundException(`care with ID ${id} not found`);

  return {
    statusCode: 200,
    message: 'Milestone deleted successfully',
  };
  }
}

