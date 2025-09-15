import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Advancement } from 'src/entity/advancement.entity';
import { SocialSection } from 'src/entity/social_section.entity';
import { Banner } from 'src/entity/banner.entity';
import { SectionElectrosteel } from 'src/entity/section_electrosteel.entity';

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
  ) {}

  async getHomeData() {
    const banners = await this.bannerRepo.find();
    const socials = await this.socialRepo.find();
    const advancements = await this.advancementRepo.find();
    const electrosteels = await this.electrosteelRepo.find();

    return {
      banners,
      socials,
      advancements,
      electrosteels,
    };
  }
}
