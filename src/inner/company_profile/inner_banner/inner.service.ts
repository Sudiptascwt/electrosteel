import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { InnerBanner } from '../../../entity/inner_banner.entity';
import { InnerBannerDto } from '../../../dto/inner_banner.dto';

@Injectable()
export class InnerService {
  constructor(
    @InjectRepository(InnerBanner)
    private readonly innerBannerRepository: Repository<InnerBanner>,
  ) {}

  async createInnerBanner(data: InnerBannerDto) {
    const existing = await this.innerBannerRepository.findOne({
      where: { banner_title: data.banner_title },
    });

    if (existing) {
      return {
        statusCode: 400,
        message: 'InnerBanner with this title already exists',
      };
    }

    const newBanner = this.innerBannerRepository.create(data);
    await this.innerBannerRepository.save(newBanner);

    return {
      statusCode: 201,
      message: 'InnerBanner created successfully',
      data: newBanner,
    };
  }

  async updateInnerBanner(id: number, data: Partial<InnerBannerDto>) {
    const banner = await this.innerBannerRepository.findOne({ where: { id } });

    if (!banner) throw new NotFoundException('InnerBanner not found');

    if (data.banner_title) {
      const exists = await this.innerBannerRepository.findOne({
        where: {
          banner_title: data.banner_title,
          id: Not(id),
        },
      });

      if (exists) {
        return {
          statusCode: 400,
          message: 'Another InnerBanner with this title already exists',
        };
      }
    }

    await this.innerBannerRepository.update(id, data);

    return {
      statusCode: 200,
      message: 'InnerBanner updated successfully',
    };
  }

  async deleteInnerBanner(id: number) {
    const banner = await this.innerBannerRepository.findOne({ where: { id } });

    if (!banner) throw new NotFoundException('InnerBanner not found');

    await this.innerBannerRepository.delete(id);

    return {
      statusCode: 200,
      message: 'InnerBanner deleted successfully',
    };
  }

  async getInnerBanner(id: number) {
    const banner = await this.innerBannerRepository.findOne({ where: { id } });

    if (!banner) throw new NotFoundException('InnerBanner not found');

    return {
      statusCode: 200,
      message: 'InnerBanner fetched successfully',
      data: banner,
    };
  }

  async getAllInnerBanners() {
    const banners = await this.innerBannerRepository.find();
    return {
      statusCode: 200,
      message: 'InnerBanners fetched successfully',
      data: banners,
    };
  }
}
