import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LowerStatistic } from '../../entity/lower_statistic.entity';
import { LowerStatisticDto } from '../../dto/lower_statistic.dto';

@Injectable()
export class LowerStatisticService {
  constructor(
    @InjectRepository(LowerStatistic)
    private readonly LowerStatisticRepository: Repository<LowerStatistic>,
  ) {}

  /**
   * Create a new LowerStatistic
   */
  async createLowerStatistic(data: Partial<LowerStatisticDto>) {
    const stat = this.LowerStatisticRepository.create(data);
    const saved = await this.LowerStatisticRepository.save(stat);

    return {
      status: true,
      statusCode: 201,
      message: 'Pipes and overview details created successfully.',
      data: saved,
    };
  }

  /**
   * Update an existing LowerStatistic
   */
  async updateLowerStatistic(id: number, data: Partial<LowerStatisticDto>) {
    const stat = await this.LowerStatisticRepository.findOne({ where: { id } });

    if (!stat) {
      return {
        status: false,
        statusCode: 404,
        message: 'Pipes and overview details not found.',
        data: [],
      };
    }

    Object.assign(stat, data);
    const updated = await this.LowerStatisticRepository.save(stat);

    return {
      status: true,
      statusCode: 200,
      message: 'Pipes and overview details updated successfully.',
      data: updated,
    };
  }

  /**
   * Get all LowerStatistics
   */
  async getAllLowerStatistics() {
    const stats = await this.LowerStatisticRepository.find({ order: { created_at: 'DESC' } });

    return {
      status: true,
      statusCode: 200,
      message: stats.length ? 'Pipes and overview details fetched successfully.' : 'No Pipes and overview details found.',
      data: stats,
    };
  }

  /**
   * Get LowerStatistic by ID
   */
  async getLowerStatisticById(id: number) {
    const stat = await this.LowerStatisticRepository.findOne({ where: { id } });

    if (!stat) {
      return {
        status: false,
        statusCode: 404,
        message: 'Pipes and overview details not found.',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Pipes and overview details fetched successfully.',
      data: [stat],
    };
  }

  /**
   * Delete LowerStatistic by ID
   */
  async deleteLowerStatistic(id: number) {
    const result = await this.LowerStatisticRepository.delete(id);

    if (result.affected === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Pipes and overview details not found.',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Pipes and overview details deleted successfully.',
      data: [],
    };
  }
}
