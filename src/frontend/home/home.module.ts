import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { Advancement } from 'src/entity/advancement.entity';
import { SocialSection } from 'src/entity/social_section.entity';
import { Banner } from 'src/entity/banner.entity';
import { SectionElectrosteel } from 'src/entity/section_electrosteel.entity';
import { Advertisement } from 'src/entity/advertisement.entity';
import { Statistic } from 'src/entity/statistic.entity';
import { Testimonial } from 'src/entity/home_testimonial.entity';
import { VideoSection } from 'src/entity/home_video_section.entity';
import { Product } from 'src/entity/product.entity';
import { Blogs } from 'src/entity/blogs.entity';
import { MilestoneTitle } from '../../entity/milestone_title.entity'
import { Milestone } from '../../entity/milestone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advancement,SocialSection,Banner,SectionElectrosteel, Advertisement, Milestone, Statistic, Testimonial, VideoSection, Product, Blogs, MilestoneTitle])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
