import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { BannerDto } from '../../dto/banner.dto';
import { Banner } from '../../entity/banner.entity';

@Injectable()
export class BannerService {
    constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>, 
  ) {}

  async createBannerImage(data: BannerDto) {
    const existingBanner = await this.bannerRepository.findOne({
      where: { banner_title: data.banner_title },
    });

    if (existingBanner) {
      return {
        statusCode: 400,
        message: 'Banner with this title already exists',
      };
    }
    const newBanner = this.bannerRepository.create(data);
    await this.bannerRepository.save(newBanner);

    return {
      statusCode: 201,
      message: 'Banner created successfully',
      data: newBanner,
    };
  }

  async updateBannerImage(id: number, data: Partial<BannerDto>) {
    const certificate = await this.bannerRepository.findOne({ where: { banner_id: id } });

    if (!certificate) {
      throw new NotFoundException('Banner image not found.');
    }

    if (data.banner_title) {
      const isoExists = await this.bannerRepository.findOne({
        where: {
          banner_title: data.banner_title,
          banner_id: Not(id),
        },
      });

      if (isoExists) {
        return {
          statusCode: 400,
          message: 'Another banner image already exists.',
        };
      }
    }
    await this.bannerRepository.update(id, data);
    return {
      statusCode: 200,
      message: 'Certificate updated successfully',
    };
  }

  async getAllBanners() {
    return this.bannerRepository.find({ order: { banner_id: 'ASC' } });
  }

  async getBannerById(id: number) {
    const banner = await this.bannerRepository.findOne({ where: { banner_id: id } });
    if (!banner) throw new NotFoundException(`Banner with ID ${id} not found`);
    return banner;
  }

  async deleteBanner(id: number) {
    const result = await this.bannerRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Banner with ID ${id} not found`);

    return {
      statusCode: 200,
      message: 'Banner deleted successfully',
    };
  }

  async inactiveBanner(id: number) {
    const result = await this.bannerRepository.update(id, { status: 0 });
    if (result.affected === 0) throw new NotFoundException(`Banner with ID ${id} not found`);

    return {
      statusCode: 200,
      message: 'Banner inactivated successfully',
    };
  }









}