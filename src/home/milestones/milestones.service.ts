import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { headings } from '../../entity/headings.entity';
import { Milestone } from '../../entity/milestones.entity';
import { headingsDto } from 'src/dto/headings.dto';
import { MilestoneBanner } from 'src/entity/milestone_banner.entity';
import { MilestoneBannerDto } from 'src/dto/milestone_banner.dto';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectRepository(headings)
    private headingsRepository: Repository<headings>,
    @InjectRepository(Milestone)
    private milestoneRepository: Repository<Milestone>,
    @InjectRepository(MilestoneBanner)
    private MilestoneBannerRepository: Repository<MilestoneBanner>,
  ) {}


  async SaveMilestoneHeroData(dto: MilestoneBannerDto) {
      try {
          const existing = await this.MilestoneBannerRepository.findOne({
              where: {}  
          });
          
          let saved;
          
          if (existing) {
              // Update existing record
              Object.assign(existing, dto);
              saved = await this.MilestoneBannerRepository.save(existing);
              
              return {
                  status: true,
                  statusCode: HttpStatus.OK,
                  message: 'Milestone Banner data updated successfully',
                  data: saved,
              };
          } else {
              // Create new record
              const created = this.MilestoneBannerRepository.create({
                  ...dto,
              });
              saved = await this.MilestoneBannerRepository.save(created);
              
              return {
                  status: true,
                  statusCode: HttpStatus.CREATED,
                  message: 'Milestone Banner data created successfully',
                  data: saved
              };
          }
      } catch (error) {
          console.error('Error in Milestone Banner data:', error);
          return {
              status: false,
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Failed to save Milestone Banner data',
              error: error.message
          };
      }
  }

  async getMilestoneHeroData() {
    const milestone = await this.MilestoneBannerRepository.find({
    });

    if (!milestone) {
      throw new NotFoundException(`Milestone banner data not found`);
    }


    return {
      status: true,
      statusCode: 200,
      message: 'Milestone banner data fetched successfully.',
      data: milestone,
    };
  }

  async SaveMilestoneHeadingData(dto: headingsDto) {
      try {
          const existing = await this.headingsRepository.findOne({where: { section_type: 'milestones' }}  );
          
          let saved;
          
          if (existing) {
              // Update existing record
              Object.assign(existing, dto);
              saved = await this.headingsRepository.save(existing);
              
              return {
                  status: true,
                  statusCode: HttpStatus.OK,
                  message: 'Milestone heading data updated successfully',
                  data: saved,
              };
          } else {
              // Create new record
              const created = this.headingsRepository.create({
                  ...dto,
              });
              saved = await this.headingsRepository.save(created);
              
              return {
                  status: true,
                  statusCode: HttpStatus.CREATED,
                  message: 'Milestone heading data created successfully',
                  data: saved
              };
          }
      } catch (error) {
          console.error('Error in Milestone heading data:', error);
          return {
              status: false,
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Failed to save Milestone heading data',
              error: error.message
          };
      }
  }

  async getMilestoneHeadingData() {
    const milestone_heading = await this.headingsRepository.find({where: { section_type: 'milestones' }});

    if (!milestone_heading) {
      throw new NotFoundException(`Milestone heading data not found`);
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Milestone heading fetched successfully.',
      data: milestone_heading
    };
  }

  async createMilestonesData(data: any) {
    if (!data) {
      throw new Error("No data received");
    }

    // Handle single milestone object directly
    // If data has a 'data' property that is an object, extract it
    let milestoneData = data;
    if (data.data && !Array.isArray(data.data) && typeof data.data === 'object') {
      milestoneData = data.data;
    }
    // If data has a 'data' property that is an array with one item
    else if (data.data && Array.isArray(data.data) && data.data.length === 1) {
      milestoneData = data.data[0];
    }

    // Validate required fields
    if (!milestoneData.title && !milestoneData.year) {
      throw new Error("Milestone must have at least title or year");
    }

    // Create single milestone
    const milestone = this.milestoneRepository.create({
      title: milestoneData.title,
      year: milestoneData.year,
      heading: milestoneData.heading || milestoneData.title,
      image: milestoneData.image,
      description: milestoneData.description,
    });
    
    const savedMilestone = await this.milestoneRepository.save(milestone);
    
    return {
      status: true,
      statusCode: 201,
      message: 'Milestone created successfully.',
      data: savedMilestone
    };
  }

  // Update single milestone by ID
  async updateMilestonesData(id: number, updateData: any) {
    const milestone = await this.milestoneRepository.findOne({
      where: { id: id },
    });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID ${id} not found`);
    }

    // Update only provided fields
    if (updateData.title) milestone.title = updateData.title;
    if (updateData.year) milestone.year = updateData.year;
    if (updateData.heading) milestone.heading = updateData.heading;
    if (updateData.image) milestone.image = updateData.image;
    if (updateData.description) milestone.description = updateData.description;

    const updatedMilestone = await this.milestoneRepository.save(milestone);

    return {
      status: true,
      statusCode: 200,
      message: 'Milestone updated successfully.',
      data: updatedMilestone,
    };
  }

  // Get all milestones with heading
  async getAllMilestonesData() {
    const headingRecord = await this.headingsRepository.findOne({
      where: { section_type: 'milestones' },
    });
    
    if (!headingRecord) {
      return {
        status: true,
        statusCode: 200,
        message: 'No milestones found.',
        data: null,
      };
    }
    
    const milestones = await this.milestoneRepository.find({
      order: {
        year: 'ASC',
        id: 'ASC',
      },
    });
    
    return {
      status: true,
      statusCode: 200,
      message: 'Milestones fetched successfully.',
      data: {
        id: headingRecord.id,
        title: headingRecord.title,
        sub_title: headingRecord.sub_title,
        description: headingRecord.description,
        section_type: headingRecord.section_type,
        data: milestones,
      },
    };
  }

  // Get single milestone by ID
  async getMilestoneById(id: number) {
    const milestone = await this.milestoneRepository.findOne({
      where: { id: id },
    });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID ${id} not found`);
    }

    // Get heading info
    const heading = await this.headingsRepository.findOne({
      where: { section_type: 'milestones' },
    });

    return {
      status: true,
      statusCode: 200,
      message: 'Milestone fetched successfully.',
      data: {
        milestone: milestone,
        heading: heading ? {
          id: heading.id,
          title: heading.title,
          sub_title: heading.sub_title,
          description: heading.description,
        } : null,
      },
    };
  }

  // Delete milestone by ID
  async deleteMilestone(id: number) {
    const milestone = await this.milestoneRepository.findOne({
      where: { id: id },
    });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID ${id} not found`);
    }

    await this.milestoneRepository.delete(id);

    return {
      status: true,
      statusCode: 200,
      message: 'Milestone deleted successfully.',
      data: { id: id },
    };
  }

  // Delete all milestones for a heading
  async deleteAllMilestones() {
    const heading = await this.headingsRepository.findOne({
      where: { section_type: 'milestones' },
    });

    if (!heading) {
      throw new NotFoundException('Milestones heading not found');
    }

    const deletedCount = await this.milestoneRepository.delete({ 
    });

    return {
      status: true,
      statusCode: 200,
      message: 'All milestones deleted successfully.',
      data: { deleted_count: deletedCount.affected },
    };
  }
}