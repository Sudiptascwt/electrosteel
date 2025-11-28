import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advancement } from 'src/entity/advancement.entity';
import { SocialSection } from 'src/entity/social_section.entity';
import { Banner } from 'src/entity/banner.entity';
import { SectionElectrosteel } from 'src/entity/section_electrosteel.entity';
import { Advertisement } from '../../entity/advertisement.entity';
import { Statistic } from 'src/entity/statistic.entity';
import { Testimonial } from 'src/entity/home_testimonial.entity';
import { VideoSection } from '../../entity/home_video_section.entity';
import { Product } from 'src/entity/product.entity';
import { Blogs } from 'src/entity/blogs.entity';
import { MilestoneTitle } from '../../entity/milestone_title.entity'
import { Milestone } from '../../entity/milestone.entity';

@Injectable()
export class HomeService {
  constructor(

    @InjectRepository(Blogs)
    private readonly BlogsRepo: Repository<Blogs>,

    @InjectRepository(Banner)
    private readonly bannerRepo: Repository<Banner>,

    @InjectRepository(SectionElectrosteel)
    private readonly electrosteelRepo: Repository<SectionElectrosteel>,

    @InjectRepository(Advertisement)
    private readonly AdvertisementRepo: Repository<Advertisement>,

    @InjectRepository(MilestoneTitle)
    private readonly MilestoneRepo: Repository<MilestoneTitle>,

    @InjectRepository(Statistic)
    private readonly StatisticRepo: Repository<Statistic>,

    @InjectRepository(VideoSection)
    private readonly VideoSectionRepo: Repository<VideoSection>,

    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
  ) {}

  async getHomeData() {
    const banners = await this.bannerRepo.find();
    const electrosteels = await this.electrosteelRepo.find();
    const advertisements = await this.AdvertisementRepo.find();
    const milestones = await this.MilestoneRepo.find();
    const statistics = await this.StatisticRepo.find();
    const video_sections = await this.VideoSectionRepo.find();
    const product_details = await this .ProductRepo.find();
    const social_blog_details = await this.BlogsRepo.find({ where: { category: 'SOCIAL' },});
    const business_blog_details = await this.BlogsRepo.find({ where: { category: 'BUSINESS WORLD' },});
    
    const formattedBanners = banners.map((banner) => {
    let fileName = null;

    try {
      if (banner.banner_file) {
        const parsed = JSON.parse(banner.banner_file);
        if (Array.isArray(parsed) && parsed.length > 0) {
          fileName = parsed[0].banner_media;
        }
      }
      } catch (error) {
        console.error("Error parsing banner_images:", error);
      }

      return {
        ...banner,
        banner_images: fileName,
      };
    });

    return {
      statusCode: 200,
      message: banners?.length > 0 
        ? "Home data fetched successfully"
        : "No home data found",
      data: {
        banners: formattedBanners,
        electrosteels,
        advertisements,
        milestones_details: milestones,
        statistics,
        video_sections,
        products: product_details,
        social_blog_details,
        business_blog_details
      },
    }
  }
}
