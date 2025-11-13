import { Injectable } from '@nestjs/common';
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

  /**
   * Create a new statistic
   */
  async createStatistic(data: Partial<StatisticDto>) {
    const stat = this.statisticRepository.create(data);
    const saved = await this.statisticRepository.save(stat);

    return {
      status: true,
      statusCode: 201,
      message: 'Statistic created successfully.',
      data: saved,
    };
  }

  /**
   * Update an existing statistic
   */
  async updateStatistic(id: number, data: Partial<StatisticDto>) {
    const stat = await this.statisticRepository.findOne({ where: { id } });

    if (!stat) {
      return {
        status: false,
        statusCode: 404,
        message: 'Statistic not found.',
        data: [],
      };
    }

    Object.assign(stat, data);
    const updated = await this.statisticRepository.save(stat);

    return {
      status: true,
      statusCode: 200,
      message: 'Statistic updated successfully.',
      data: updated,
    };
  }

  /**
   * Get all statistics
   */
  async getAllStatistics() {
    const stats = await this.statisticRepository.find({ order: { created_at: 'DESC' } });

    return {
      status: true,
      statusCode: 200,
      message: stats.length ? 'Statistics fetched successfully.' : 'No statistics found.',
      data: stats,
    };
  }

  /**
   * Get statistic by ID
   */
  async getStatisticById(id: number) {
    const stat = await this.statisticRepository.findOne({ where: { id } });

    if (!stat) {
      return {
        status: false,
        statusCode: 404,
        message: 'Statistic not found.',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Statistic fetched successfully.',
      data: [stat],
    };
  }

  /**
   * Delete statistic by ID
   */
  async deleteStatistic(id: number) {
    const result = await this.statisticRepository.delete(id);

    if (result.affected === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Statistic not found.',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Statistic deleted successfully.',
      data: [],
    };
  }
}
