import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advertisement } from '../../entity/advertisement.entity';
import { AdvertisementDto } from '../../dto/advertisement.dto';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRepository: Repository<Advertisement>,
  ) {}

  /**
   * Create a new advertisement
   */
  async create(data: AdvertisementDto) {
    const newAd = this.advertisementRepository.create(data);
    const savedAd = await this.advertisementRepository.save(newAd);

    return {
      status: true,
      statusCode: 201,
      message: 'Advertisement created successfully',
      data: savedAd,
    };
  }

  /**
   * Update existing advertisement by ID
   */
  async update(id: number, data: Partial<AdvertisementDto>) {
    const existingAd = await this.advertisementRepository.findOne({ where: { id, status: 1 } });

    if (!existingAd) {
      return {
        status: false,
        statusCode: 404,
        message: 'Advertisement not found',
        data: [],
      };
    }

    Object.assign(existingAd, data);
    const updatedAd = await this.advertisementRepository.save(existingAd);

    return {
      status: true,
      statusCode: 200,
      message: 'Advertisement updated successfully',
      data: updatedAd,
    };
  }

  /**
   * Get all advertisements (sorted by latest)
   */
  async getAll() {
    const [advertisements, count] = await this.advertisementRepository.findAndCount({
      where: { status: 1 },
      order: { created_at: 'DESC' },
    });

    return {
      status: true,
      statusCode: 200,
      message: advertisements.length
        ? 'Advertisements fetched successfully'
        : 'No advertisements found',
      count,
      data: advertisements
    };
  }

  /**
   * Get advertisement by ID
   */
  async getById(id: number) {
    const advertisement = await this.advertisementRepository.findOne({ where: { id, status: 1 } });

    if (!advertisement) {
      return {
        status: false,
        statusCode: 404,
        message: 'Advertisement not found',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Advertisement fetched successfully',
      data: [advertisement],
    };
  }

  /**
   * Delete advertisement by ID
   */
  async delete(id: number) {
    const result = await this.advertisementRepository.update(
      { id },      
      { status: 0 }
    );

    if (result.affected === 0) {
      return {
        status: false,
        statusCode: 404,
        message: 'Advertisement not found',
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Advertisement deleted successfully (status changed to 0)',
      data: [],
    };
  }
}
