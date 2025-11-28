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


    private parseBannerFile(banner: Banner): Banner {
    if (banner?.banner_file) {
      try {
        banner.banner_file = JSON.parse(banner.banner_file as any);
      } catch (e) {
        // ignore parse error, keep as raw string
      }
    }
    return banner;
  }

  /**
   * Create new banner
   */
  async createBannerImage(data: BannerDto | BannerDto[]) {
    const bannersInput = Array.isArray(data) ? data : [data];

    const results: Banner[] = [];

    for (const item of bannersInput) {
      // 1️⃣ Check if a banner with this title already exists
      let existing: Banner | null = null;

      if (item.title) {
        existing = await this.bannerRepository.findOne({
          where: { title: item.title, status: 1 },
        });
      }

      // 2️⃣ Prepare payload (handle banner_file as JSON/string)
      const payload: any = { ...item };

      if (payload.banner_file !== undefined) {
        payload.banner_file =
          typeof payload.banner_file === 'string'
            ? payload.banner_file
            : JSON.stringify(payload.banner_file);
      }

      // 3️⃣ If exists → UPDATE, else → CREATE
      if (existing) {
        await this.bannerRepository.update(existing.id, payload);

        const updated = await this.bannerRepository.findOne({
          where: { id: existing.id },
        });

        if (updated) {
          this.parseBannerFile(updated);
          results.push(updated);
        }
      } else {
        const newBanner = await this.bannerRepository.save(payload as Banner);
        this.parseBannerFile(newBanner);
        results.push(newBanner);
      }
    }

    return {
      status: true,
      statusCode: 200,
      message: 'Banners created/updated successfully',
      data: results,
    };
  }

  /**
   * Update banner by ID
   */
  async updateBannerImage(id: number, data: Partial<BannerDto>) {
    const banner = await this.bannerRepository.findOne({
      where: { id, status: 1 },
    });

    if (!banner) {
      return {
        status: false,
        statusCode: 404,
        message: 'Banner not found',
        data: [],
      };
    }

    const updatePayload: any = { ...data };

    if (data.banner_file !== undefined) {
      updatePayload.banner_file =
        typeof data.banner_file === 'string'
          ? data.banner_file
          : JSON.stringify(data.banner_file);
    }

    await this.bannerRepository.update(id, updatePayload);

    const updated = await this.bannerRepository.findOne({ where: { id } });

    if (updated) {
      this.parseBannerFile(updated);
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

    const parsedBanners = banners.map((b) => this.parseBannerFile(b));

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
    const banner = await this.bannerRepository.findOne({
      where: { id, status: 1 },
    });

    if (!banner) {
      return {
        status: false,
        statusCode: 404,
        message: `Banner with ID ${id} not found`,
        data: [],
      };
    }

    this.parseBannerFile(banner);

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
