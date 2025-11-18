import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { BannerDto } from '../../dto/banner.dto';
import { Banner } from '../../entity/banner.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {}

  /**
   * Create new banner
   */
  async createBannerImage(data: BannerDto) {
    // Check duplicate title
    if (data.title) {
      const exists = await this.bannerRepository.findOne({
        where: { title: data.title },
      });

      // if (exists) {
      //   return {
      //     status: false,
      //     statusCode: 400,
      //     message: `Banner with title '${data.title}' already exists`,
      //     data: [],
      //   };
      // }
    }

    const newBanner = this.bannerRepository.create(data);
    await this.bannerRepository.save(newBanner);

    return {
      status: true,
      statusCode: 201,
      message: 'Banner created successfully',
      data: newBanner,
    };
  }



  /**
   * Update banner by ID
   */
  async updateBannerImage(id: number, data: Partial<BannerDto>) {
    const banner = await this.bannerRepository.findOne({ where: { id } });

    if (!banner) {
      return {
        status: false,
        statusCode: 404,
        message: 'Banner not found',
        data: [],
      };
    }

    // Check duplicate title
    if (data.title) {
      const exists = await this.bannerRepository.findOne({
        where: { title: data.title, id: Not(id) },
      });

      // if (exists) {
      //   return {
      //     status: false,
      //     statusCode: 400,
      //     message: `Another banner with title '${data.title}' already exists`,
      //     data: [],
      //   };
      // }
    }

    await this.bannerRepository.update(id, data);
    const updated = await this.bannerRepository.findOne({ where: { id } });

    return {
      status: true,
      statusCode: 200,
      message: 'Banner updated successfully',
      data: updated,
    };
  }



  /**
   * Get all banners
   */
  async getAllBanners() {
    const banners = await this.bannerRepository.find({ order: { id: 'ASC' } });

    return {
      status: true,
      statusCode: 200,
      message: banners.length ? 'Banners fetched successfully' : 'No banners found',
      data: banners,
    };
  }

  /**
   * Get banner by ID
   */
  async getBannerById(id: number) {
    const banner = await this.bannerRepository.findOne({ where: { id } });

    if (!banner) {
      return {
        status: false,
        statusCode: 404,
        message: `Banner with ID ${id} not found`,
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Banner fetched successfully',
      data: [banner],
    };
  }

  /**
   * Delete banner by ID
   */
  async deleteBanner(id: number) {
    const result = await this.bannerRepository.delete(id);

    if (result.affected === 0) {
      return {
        status: false,
        statusCode: 404,
        message: `Banner with ID ${id} not found`,
        data: [],
      };
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Banner deleted successfully',
      data: [],
    };
  }
}
