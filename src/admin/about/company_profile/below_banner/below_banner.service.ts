import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { BelowBanner } from 'src/entity/below_banner.entity';
import { BelowBannerDto } from 'src/dto/below_banner.dto';

@Injectable()
export class BelowBannerService{
  constructor(
    @InjectRepository(BelowBanner)
    private readonly InnerBelowBannerRepository: Repository<BelowBanner>,
  ) {}

  async createBelowBanner(data: BelowBannerDto) {
    try{
      const newBelowBanner = this.InnerBelowBannerRepository.create(data);
      await this.InnerBelowBannerRepository.save(newBelowBanner);

      return {
        status: true,
        statusCode: 201,
        message: 'Below banner created successfully',
        data: newBelowBanner,
      };
    } catch (error) {
        return {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while creating below banner data',
          error: error.message,
        };
      }
  }

  async updateBelowBanner(id: number, data: Partial<BelowBannerDto>) {
    try{
      const BelowBanner = await this.InnerBelowBannerRepository.findOne({ where: { id } });

      if (!BelowBanner) {
        throw new NotFoundException({
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: `Below banner not found`,
        });
      }

    //   if (data.BelowBanner_title) {
    //     const exists = await this.InnerBelowBannerRepository.findOne({
    //       where: {
    //           BelowBanner_title: data.BelowBanner_title,
    //         id: Not(id),
    //       },
    //     });

    //     if (exists) {
    //       return {
    //         status: false,
    //         statusCode: 400,
    //         message: 'Another InnerBelowBanner with this title already exists',
    //       };
    //     }
    //   }

      await this.InnerBelowBannerRepository.update(id, data);

      return {
        status: true,
        statusCode: 200,
        message: 'Below banner updated successfully',
      };
    } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while updating below banner data',
            error: error.message,
        };
    }
  }

  async deleteBelowBanner(id: number) {
    try{
      const BelowBanner = await this.InnerBelowBannerRepository.findOne({ where: { id } });

      if (!BelowBanner) {
        throw new NotFoundException({
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: `Below banner not found`,
        });
      }

      await this.InnerBelowBannerRepository.delete(id);

      return {
        status: true,
        statusCode: 200,
        message: 'Below banner deleted successfully',
      };
    } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while deleting below banner data',
            error: error.message,
        };
    }
  }

  async getBelowBanner(id: number) {
    try{
      const BelowBanner = await this.InnerBelowBannerRepository.findOne({ where: { id } });

      if (!BelowBanner) {
        throw new NotFoundException({
          status: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: `Below banner not found`,
        });
      }

      return {
        status: true,
        statusCode: 200,
        message: 'Below banner fetched successfully',
        data: BelowBanner,
      }
    } catch (error) {
        return {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong while deleting Inner BelowBanner data',
          error: error.message,
        };
    }
  }

  async getAllBelowBanners() {
    try{
      const BelowBanners = await this.InnerBelowBannerRepository.find();
      return {
        status: true,
        statusCode: 200,
        message: 'All below banners fetched successfully',
        data: BelowBanners,
      };
    } catch (error) {
        return {
            status: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while deleting below banner data',
            error: error.message,
        };
    }
  }
}
