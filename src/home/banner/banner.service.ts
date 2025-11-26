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
    if (data.title) {
      const exists = await this.bannerRepository.findOne({
        where: { title: data.title },
      });
    }

    const payload: any = { ...data };

    if (payload.banner_images !== undefined) {
      payload.banner_images =
        typeof payload.banner_images === 'string'
          ? payload.banner_images
          : JSON.stringify(payload.banner_images);
    }

    const newBanner: Banner = await this.bannerRepository.save(payload as Banner);

    if (newBanner.banner_images) {
      try {
        newBanner.banner_images = JSON.parse(newBanner.banner_images as any);
      } catch (e) {
      }
    }

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
    const banner = await this.bannerRepository.findOne({ where: { id, status: 1 } });
    if (!banner) {
      return {
        status: false,
        statusCode: 404,
        message: 'Banner not found',
        data: [],
      };
    }
    const updatePayload: any = { ...data };
    if (data.banner_images !== undefined) {
      updatePayload.banner_images =
        typeof data.banner_images === 'string'
          ? data.banner_images
          : JSON.stringify(data.banner_images);
    }

    await this.bannerRepository.update(id, updatePayload);

    const updated = await this.bannerRepository.findOne({ where: { id } });

    if (updated && updated.banner_images) {
      try {
        updated.banner_images = JSON.parse(updated.banner_images as any);
      } catch (e) {
        
      }
    }

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
    const [banners, count] = await this.bannerRepository.findAndCount({
      where: { status: 1 },
      order: { id: 'ASC' },
    });

    const parsedBanners = banners.map((b) => {
      if (b.banner_images) {
        try {
          b.banner_images = JSON.parse(b.banner_images as any);
        } catch (e) {}
      }
      return b;
    });

    return {
      status: true,
      statusCode: 200,
      message: count ? 'Banners fetched successfully' : 'No banners found',
      count,            
      data: parsedBanners,
    };
  }

  /**
   * Get banner by ID
   */
  async getBannerById(id: number) {
    const banner = await this.bannerRepository.findOne({ where: { id, status: 1 } });

    if (!banner) {
      return {
        status: false,
        statusCode: 404,
        message: `Banner with ID ${id} not found`,
        data: [],
      };
    }

    if (banner.banner_images) {
      try {
        banner.banner_images = JSON.parse(banner.banner_images as any);
      } catch (e) {}
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
    const result = await this.bannerRepository.update(
      { id },      
      { status: 0 }
    );

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
