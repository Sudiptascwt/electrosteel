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
    const newBanner = this.bannerRepository.create(data);
    await this.bannerRepository.save(newBanner);

    return {
      statusCode: 201,
      message: 'Banner created successfully',
      data: newBanner,
    };
  }

  async updateBannerImage(id: number, data: Partial<BannerDto>) {
    const banner = await this.bannerRepository.findOne({ where: { id: id } });

    if (!banner) {
      throw new NotFoundException('Banner image not found.');
    }

    if (data.title) {
      const isoExists = await this.bannerRepository.findOne({
        where: {
          title: data.title,
          id: Not(id),
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
      message: 'Banner updated successfully',
    };
  }

  async getAllBanners() {
    return this.bannerRepository.find({ order: { id: 'ASC' } });
  }

  async getBannerById(id: number) {
    const banner = await this.bannerRepository.findOne({ where: { id: id } });
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