import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { headings } from '../../entity/headings.entity';
import { Milestone } from '../../entity/milestones.entity';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectRepository(headings)
    private headingsRepository: Repository<headings>,
    @InjectRepository(Milestone)
    private milestoneRepository: Repository<Milestone>,
  ) {}

  async saveMilestonesData(data: any) {
    if (!data) {
      throw new Error("No data received");
    }

    let headingRecord = await this.headingsRepository.findOne({
      where: { section_type: 'milestones' },
    });

    if (headingRecord) {
      headingRecord.title = data.title;
      headingRecord.sub_title = data.sub_title;
      await this.headingsRepository.save(headingRecord);
      await this.milestoneRepository.deleteAll();

      const newMilestones = data.data.map(item => 
        this.milestoneRepository.create({
          title: item.title,
          year: item.year,
          heading: item.heading,
          image: item.image,
          description: item.description,
        })
      );
      
      const savedMilestones = await this.milestoneRepository.save(newMilestones);
      
      return {
        status: true,
        statusCode: 200,
        message: 'Milestones updated successfully.',
        data: {
          id: headingRecord.id,
          title: headingRecord.title,
          sub_title: headingRecord.sub_title,
          section_type: headingRecord.section_type,
          data: savedMilestones,
        },
      };
    } else {
      const newHeading = this.headingsRepository.create({
        title: data.title,
        sub_title: data.sub_title,
        section_type: 'milestones',
      });
      
      const savedHeading = await this.headingsRepository.save(newHeading);

      const milestones = data.data.map(item => 
        this.milestoneRepository.create({
          title: item.title,
          year: item.year,
          heading: item.heading,
          image: item.image,
          description: item.description,
        })
      );
      
      const savedMilestones = await this.milestoneRepository.save(milestones);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Milestones created successfully.',
        data: {
          id: savedHeading.id,
          title: savedHeading.title,
          sub_title: savedHeading.sub_title,
          section_type: savedHeading.section_type,
          data: savedMilestones,
        },
      };
    }
  }

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
}