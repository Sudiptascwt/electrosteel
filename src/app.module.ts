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
import { Care } from './entity/care.entity';
import { MilestoneModule } from './home/milestone/milestone.module';
import { Milestone } from './entity/milestone.entity';
import { MilestoneImage } from './entity/milestone_image.entity';
import { Advancement } from './entity/advancement.entity';
import { AdvancementModule } from './home/advancements/advancement.module';
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
import { SocialSectionModule } from './home/social_section/social_section.module';
import { SocialSection } from './entity/social_section.entity';
import { Advertisement } from './entity/advertisement.entity';
import { AdvertisementModule } from './home/advertisement/advertisement.module';
import { Image } from './entity/image_file.entity';
import { ImageModule } from './image/image.module';
import { officeDetails } from './entity/office_section.entity';
import { OfficeDetailsModule } from './office_details/office_details.module';
import { IndiaOfficeDetailsModule } from './india_office_details/india_office_details.module';
import { IndiaOfficeDetails } from './entity/india_office_details.entity';
import { ContactDetails } from './entity/contact_details.entity';
import { ContactDetailsModule } from './contact_details/contact_details.module';
import { product_applications } from './entity/product_application.entity';
import { ProductApplicationsModule } from './products/product.module';
import { product_application_images } from './entity/product_application_images.entity';
import { ProductType } from './entity/product_type.entity';
import { ProductTypeModule } from './products/product_types/product_type.module';
import { SocialPlatform } from './entity/social_platform.entity';
import { ManufacturingModule } from './manufacturing_unit/manufacturing_unit.module';
import { ManufacturingUnit } from './entity/manufacturing.entity';
import { ProductBrochuresModule } from './products/product_brochures/product_brochures.module';
import { ProductBrochures } from './entity/product_brochures.entity';
import { Facility } from './entity/facility.entity';
import { FacilityModule } from './facility/facility.module'
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
      entities: [User, Certificate, Banner, MilestoneImage, Advancement, InnerBanner, InnerFeature, Statistic, Product, SectionElectrosteel, VideoSection, Testimonial, SocialSection, Advertisement, Image,officeDetails, IndiaOfficeDetails, ContactDetails, product_applications,product_application_images, ProductType, SocialPlatform, ManufacturingUnit, ProductBrochures, Facility ], 
      synchronize: true, // only for dev
      // synchronize: false, 
      logging: true,
    }),
    UsersModule,
    AuthModule,
    HomeModule,
    BannerModule,
    MilestoneModule,
    AdvancementModule,
    InnerModule,
    InnerSliderModule,
    StatisticModule,
    ProductModule,
    SectionElectrosteelModule,
    VideoSectionModule,
    TestimonialModule,
    SocialSectionModule,
    AdvertisementModule,
    ImageModule,
    OfficeDetailsModule,
    IndiaOfficeDetailsModule,
    ContactDetailsModule,
    ProductApplicationsModule,
    ProductTypeModule,
    ManufacturingModule,
    ProductBrochuresModule,
    FacilityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
