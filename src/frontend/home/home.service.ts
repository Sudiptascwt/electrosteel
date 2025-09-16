import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advancement } from 'src/entity/advancement.entity';
import { SocialSection } from 'src/entity/social_section.entity';
import { Banner } from 'src/entity/banner.entity';
import { SectionElectrosteel } from 'src/entity/section_electrosteel.entity';
import { Advertisement } from '../../entity/advertisement.entity';
import { Milestone } from 'src/entity/milestone.entity';
import { Statistic } from 'src/entity/statistic.entity';
import { Testimonial } from 'src/entity/home_testimonial.entity';
import { VideoSection } from '../../entity/home_video_section.entity'

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Advancement)
    private readonly advancementRepo: Repository<Advancement>,

    @InjectRepository(SocialSection)
    private readonly socialRepo: Repository<SocialSection>,

    @InjectRepository(Banner)
    private readonly bannerRepo: Repository<Banner>,

    @InjectRepository(SectionElectrosteel)
    private readonly electrosteelRepo: Repository<SectionElectrosteel>,

    @InjectRepository(Advertisement)
    private readonly AdvertisementRepo: Repository<Advertisement>,

    @InjectRepository(Milestone)
    private readonly MilestoneRepo: Repository<Milestone>,

    @InjectRepository(Statistic)
    private readonly StatisticRepo: Repository<Statistic>,

    @InjectRepository(Testimonial)
    private readonly TestimonialRepo: Repository<Testimonial>,

    @InjectRepository(VideoSection)
    private readonly VideoSectionRepo: Repository<VideoSection>,
  ) {}

  async getHomeData() {
    const banners = await this.bannerRepo.find();
    const socials = await this.socialRepo.find();
    const advancements = await this.advancementRepo.find();
    const electrosteels = await this.electrosteelRepo.find();
    const advertisements = await this.AdvertisementRepo.find();
    const milestones = await this.MilestoneRepo.find();
    const statistics = await this.StatisticRepo.find();
    const testimonial = await this.TestimonialRepo.find();
    const video_sections = await this.VideoSectionRepo.find();

    return {
      banners,
      socials,
      advancements,
      electrosteels,
      advertisements,
      milestones,
      statistics,
      testimonial,
      video_sections
    };
  }
}
