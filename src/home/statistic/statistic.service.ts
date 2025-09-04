import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistic } from '../../entity/statistic.entity';
import { StatisticDto } from '../../dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic)
    private readonly statisticRepository: Repository<Statistic>,
  ) {}

  async createStatistic(data: Partial<StatisticDto>): Promise<{ statusCode: number; data: Statistic, message: string }> {
    const stat = this.statisticRepository.create(data);
    const saved = await this.statisticRepository.save(stat);
    return {
      statusCode: 201,
      data: saved,
      message: 'Statistic created successfully.'
    };
  }

  async updateStatistic(id: number, data: Partial<StatisticDto>): Promise<{ statusCode: number; data: Statistic, message: string }> {
    const stat = await this.statisticRepository.findOne({ where: { id } });
    if (!stat) throw new NotFoundException({ statusCode: 404, message: 'Statistic not found' });

    Object.assign(stat, data);
    const updated = await this.statisticRepository.save(stat);
    return {
      statusCode: 200,
      data: updated,
      message: 'Statistic updated successfully.'
    };
  }

  async getAllStatistics(): Promise<{ statusCode: number; data: Statistic[], message: string }> {
    const stats = await this.statisticRepository.find({ order: { created_at: 'DESC' } });
    return {
      statusCode: 200,
      data: stats,
      message: 'Statistics fetched successfully.'
    };
  }

  async getStatisticById(id: number): Promise<{ statusCode: number; data: Statistic, message: string }> {
    const stat = await this.statisticRepository.findOne({ where: { id } });
    if (!stat) throw new NotFoundException({ statusCode: 404, message: 'Statistic not found' });
    return {
      statusCode: 200,
      data: stat,
      message: 'Statistics fetched successfully.'
    };
  }

  async deleteStatistic(id: number): Promise<{ statusCode: number; message: string, }> {
    const result = await this.statisticRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException({ statusCode: 404, message: 'Statistic not found' });
    return {
      statusCode: 200,
      message: 'Statistic deleted successfully',
    };
  }
}
