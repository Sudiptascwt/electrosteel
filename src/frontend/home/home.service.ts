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
    const banners = await this.bannerRepo.find({where: { status: 1 } });
    const electrosteels = await this.electrosteelRepo.find({where: { status: 1 } });
    const advertisements = await this.AdvertisementRepo.find({where: { status: 1 } });
    const milestones = await this.MilestoneRepo.find({where: { status: 1 } });
    const statistics = await this.StatisticRepo.find({where: { status: 1 } });
    const video_sections = await this.VideoSectionRepo.find({where: { status: 1 } });  
    const product_details = await this .ProductRepo.find({where: { status: 1 } });
    const social_blog_details = await this.BlogsRepo.find({ where: { status: 1,category: 'SOCIAL' },});
    const business_blog_details = await this.BlogsRepo.find({ where: { status: 1,category: 'BUSINESS WORLD' },});
    
    const formattedBanners = banners.map((banner) => {
      let fileName: string | null = null;
      let fileType: string | null = null;

      try {
        const raw = banner.banner_file;

        if (!raw) {
          fileName = null;
        } else if (typeof raw === 'string' && raw.trim().startsWith('{')) {
          // Case: JSON string like {"banner_file":"file-xxx.mp4"} or {"banner_media":"..."}
          const parsed = JSON.parse(raw);
          fileName = parsed.banner_media || parsed.banner_file || null;
        } else {
          fileName = raw;
        }

        if (fileName && fileName.includes('.')) {
          const ext = fileName.split('.').pop()?.toLowerCase() || '';

          const imageExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
          const videoExt = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v'];

          if (imageExt.includes(ext)) {
            fileType = 'image';
          } else if (videoExt.includes(ext)) {
            fileType = 'video';
          } else {
            fileType = 'unknown';
          }
        } else if (fileName) {
          fileType = 'unknown';
        }
      } catch (error) {
        console.error('Error parsing banner_file for banner id', banner.id, error);
      }

      return {
        ...banner,
        banner_images: fileName, 
        file_type: fileType, 
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
