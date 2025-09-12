import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { InnerFeature } from '../../../entity/inner_feature.entity';
import { InnerFeatureDto } from '../../../dto/inner_feature.dto';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(InnerFeature)
    private readonly InnerFeatureRepository: Repository<InnerFeature>,
  ) {}

  async createInnerFeature(data: InnerFeatureDto) {

    const newFeature = this.InnerFeatureRepository.create(data);
    await this.InnerFeatureRepository.save(newFeature);

    return {
      statusCode: 201,
      message: 'InnerFeature created successfully',
      data: newFeature,
    };
  }

  async updateInnerFeature(id: number, data: Partial<InnerFeatureDto>) {
    const Feature = await this.InnerFeatureRepository.findOne({ where: { id } });

    if (!Feature) throw new NotFoundException('InnerFeature not found');

    if (data.feature_title) {
      const exists = await this.InnerFeatureRepository.findOne({
        where: {
            feature_title: data.feature_title,
          id: Not(id),
        },
      });

      if (exists) {
        return {
          statusCode: 400,
          message: 'Another InnerFeature with this title already exists',
        };
      }
    }

    await this.InnerFeatureRepository.update(id, data);

    return {
      statusCode: 200,
      message: 'InnerFeature updated successfully',
    };
  }

  async deleteInnerFeature(id: number) {
    const Feature = await this.InnerFeatureRepository.findOne({ where: { id } });

    if (!Feature) throw new NotFoundException('InnerFeature not found');

    await this.InnerFeatureRepository.delete(id);

    return {
      statusCode: 200,
      message: 'InnerFeature deleted successfully',
    };
  }

  async getInnerFeature(id: number) {
    const Feature = await this.InnerFeatureRepository.findOne({ where: { id } });

    if (!Feature) throw new NotFoundException('InnerFeature not found');

    return {
      statusCode: 200,
      message: 'InnerFeature fetched successfully',
      data: Feature,
    };
  }

  async getAllInnerFeatures() {
    const Features = await this.InnerFeatureRepository.find();
    return {
      statusCode: 200,
      message: 'InnerFeatures fetched successfully',
      data: Features,
    };
  }
}
