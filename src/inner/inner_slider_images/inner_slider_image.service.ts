import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { InnerBanner } from '../../entity/inner_banner.entity';
import { InnerBannerDto } from '../../dto/inner_banner.dto';

@Injectable()
export class InnerSliderService {
  constructor(
    @InjectRepository(InnerBanner)
    private readonly innerSliderRepository: Repository<InnerBanner>,
  ) {}

  async createInnerSlider(data: InnerBannerDto) {
    const existing = await this.innerSliderRepository.findOne({
      where: { banner_title: data.banner_title },
    });

    const newBanner = this.innerSliderRepository.create(data);
    await this.innerSliderRepository.save(newBanner);

    return {
      statusCode: 201,
      message: 'InnerBanner created successfully',
      data: newBanner,
    };
  }

  async updateInnerSlider(id: number, data: Partial<InnerBannerDto>) {
    const banner = await this.innerSliderRepository.findOne({ where: { id } });

    if (!banner) throw new NotFoundException('InnerBanner not found');

    if (data.banner_title) {
      const exists = await this.innerSliderRepository.findOne({
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

    await this.innerSliderRepository.update(id, data);

    return {
      statusCode: 200,
      message: 'InnerBanner updated successfully',
    };
  }

  async deleteInnerSlider(id: number) {
    const banner = await this.innerSliderRepository.findOne({ where: { id } });

    if (!banner) throw new NotFoundException('InnerBanner not found');

    await this.innerSliderRepository.delete(id);

    return {
      statusCode: 200,
      message: 'InnerBanner deleted successfully',
    };
  }

  async getInnerSlider(id: number) {
    const banner = await this.innerSliderRepository.findOne({ where: { id } });

    if (!banner) throw new NotFoundException('InnerBanner not found');

    return {
      statusCode: 200,
      message: 'InnerBanner fetched successfully',
      data: banner,
    };
  }

  async getAllInnerSliders() {
    const banners = await this.innerSliderRepository.find();
    return {
      statusCode: 200,
      message: 'InnerBanners fetched successfully',
      data: banners,
    };
  }
}
