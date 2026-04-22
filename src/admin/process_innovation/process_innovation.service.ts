import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  { ProcessInnovationHero } from '../../entity/process_innovation_hero.entity'
import { ProcessInnovationHeroDto } from 'src/dto/process_innovation_hero.dto';

@Injectable()
export class process_innovationService {
  constructor(
    @InjectRepository(ProcessInnovationHero)
    private ProcessInnovationHeroRepository: Repository<ProcessInnovationHero>,

  ) {}

  // ============ About Main Methods ============

  async saveProcessInnovationHero(data:ProcessInnovationHeroDto) {
    if (!data) {
      throw new Error("No data received");
    }
    let existingRecords = await this.ProcessInnovationHeroRepository.find();

    if (existingRecords && existingRecords.length > 0) {
      const recordToUpdate = existingRecords[0];
      recordToUpdate.title = data.title;
      recordToUpdate.banner = data.banner;
      
      const savedRecord = await this.ProcessInnovationHeroRepository.save(recordToUpdate);
      
      return {
        status: true,
        statusCode: 200,
        message: 'Process Innovation Hero data updated successfully.',
        data: savedRecord
      };
    } else {
      const newRecord = this.ProcessInnovationHeroRepository.create({
        title: data.title,
        banner: data.banner
      });
      
      const savedRecord = await this.ProcessInnovationHeroRepository.save(newRecord);
      
      return {
        status: true,
        statusCode: 201,
        message: 'Process Innovation Hero data created successfully.',
        data: savedRecord
      };
    }
  }

  async getProcessInnovationHero() {
    const existingData = await this.ProcessInnovationHeroRepository.find({});
    
    if (!existingData || existingData.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Process Innovation Hero data not found',
        data: [],
      };
    }
    
    return {
      status: true,
      statusCode: 200,
      message: 'Process Innovation Hero data fetched successfully',
      data: existingData
    };
  }

}