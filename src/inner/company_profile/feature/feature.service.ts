import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    try{
      const newFeature = this.InnerFeatureRepository.create(data);
      await this.InnerFeatureRepository.save(newFeature);

      return {
        status: true,
        statusCode: 201,
        message: 'InnerFeature created successfully',
        data: newFeature,
      };
    } catch (error) {
        return {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating Inner feature data',
          error: error.message,
        };
    }
  }

  async updateInnerFeature(id: number, data: Partial<InnerFeatureDto>) {
    try{
      const Feature = await this.InnerFeatureRepository.findOne({ where: { id } });

      if (!Feature) {
        throw new NotFoundException({
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: `InnerFeature not found`,
        });
      }

      if (data.feature_title) {
        const exists = await this.InnerFeatureRepository.findOne({
          where: {
              feature_title: data.feature_title,
            id: Not(id),
          },
        });

        if (exists) {
          return {
            status: false,
            statusCode: 400,
            message: 'Another InnerFeature with this title already exists',
          };
        }
      }

      await this.InnerFeatureRepository.update(id, data);

      return {
        status: true,
        statusCode: 200,
        message: 'InnerFeature updated successfully',
      };
    } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while updating Inner feature data',
            error: error.message,
        };
    }
  }

  async deleteInnerFeature(id: number) {
    try{
      const Feature = await this.InnerFeatureRepository.findOne({ where: { id } });

      if (!Feature) {
        throw new NotFoundException({
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: `InnerFeature not found`,
        });
      }

      await this.InnerFeatureRepository.delete(id);

      return {
        status: true,
        statusCode: 200,
        message: 'InnerFeature deleted successfully',
      };
    } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while deleting Inner feature data',
            error: error.message,
        };
    }
  }

  async getInnerFeature(id: number) {
    try{
      const Feature = await this.InnerFeatureRepository.findOne({ where: { id } });

      if (!Feature) {
        throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `InnerFeature not found`,
        });
      }

      return {
        status: true,
        statusCode: 200,
        message: 'InnerFeature fetched successfully',
        data: Feature,
      }
    } catch (error) {
        return {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while deleting Inner feature data',
          error: error.message,
        };
    }
  }

  async getAllInnerFeatures() {
    try{
      const Features = await this.InnerFeatureRepository.find();
      return {
        status: true,
        statusCode: 200,
        message: 'InnerFeatures fetched successfully',
        data: Features,
      };
    } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while deleting Inner feature data',
            error: error.message,
        };
    }
  }
}
