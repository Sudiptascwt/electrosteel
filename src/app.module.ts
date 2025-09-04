import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Certificate } from './entity/certificate.entity';
import { Banner } from './entity/banner.entity';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { BannerModule } from './home/banner/banner.module';
import { Investor } from './entity/investor.entity';
import { InvestorModule } from './home/investor/investor.module';
import { CareModule } from './home/cares/care.module';
import { Care } from './entity/care.entity';
import { MilestoneModule } from './home/milestone/milestone.module';
import { Milestone } from './entity/milestone.entity';
import { MilestoneImage } from './entity/milestone_image.entity';
import { Advancement } from './entity/advancement.entity';
import { AdvancementModule } from './home/advancements/advancement.module';
import { GlobalPresence } from './entity/global_presense.entity';
import { GlobalPresenceModule } from './home/global_presence/global_presense.module';
import { AllCertificate } from './entity/all_certificates.entity';
import { AllCertificatesModule } from './home/all_certificates/certificates.module';
import { InformationModule } from './home/information/information.module';
import { Information } from './entity/information.entity';
import {InnerModule } from './inner/inner_banner/inner.module';
import { InnerBanner } from './entity/inner_banner.entity';
import { InnerSliderModule } from './inner/inner_slider_images/inner_slider_image.module'
import { InnerFeature } from './entity/inner_feature.entity';
import { Statistic } from './entity/statistic.entity';
import { StatisticModule } from './home/statistic/statistic.module';
import { Product } from './entity/product.entity';
import { ProductModule } from './home/products/product.module';
import { SectionElectrosteelModule } from './home/section_electrosteel/section_electrosteel.module';
import { SectionElectrosteel } from './entity/section_electrosteel.entity';
import { VideoSectionModule } from './home/video_section/video_section.module';
import { VideoSection } from './entity/home_video_section.entity';
import { Testimonial } from './entity/home_testimonial.entity';
import { TestimonialModule } from './home/testimonial/testimonial.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'electrosteel',
      // entities: [User, Certificate, Banner, Investor, Care, Milestone, MilestoneImage, Advancement], 
      entities: [User, Certificate, Banner, Investor, Care, MilestoneImage, Advancement, GlobalPresence, AllCertificate, Information,InnerBanner, InnerFeature, Statistic, Product, SectionElectrosteel, VideoSection, Testimonial], 
      synchronize: true, // only for dev
      // synchronize: false, 
      logging: true,
    }),
    UsersModule,
    AuthModule,
    HomeModule,
    BannerModule,
    InvestorModule,
    CareModule,
    MilestoneModule,
    AdvancementModule,
    GlobalPresenceModule,
    AllCertificatesModule,
    InformationModule,
    InnerModule,
    InnerSliderModule,
    StatisticModule,
    ProductModule,
    SectionElectrosteelModule,
    VideoSectionModule,
    TestimonialModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
