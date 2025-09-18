import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './admin/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './admin/users/user.entity';
import { Certificate } from './entity/certificate.entity';
import { Banner } from './entity/banner.entity';
import { AuthModule } from './auth/auth.module';
import { HomesModule } from './home/home.module';
import { BannerModule } from './home/banner/banner.module';
import { Investor } from './entity/investor.entity';
import { Care } from './entity/care.entity';
import { MilestoneModule } from './home/milestone/milestone.module';
import { Milestone } from './entity/milestone.entity';
import { MilestoneImage } from './entity/milestone_image.entity';
import { Advancement } from './entity/advancement.entity';
import { AdvancementModule } from './home/advancements/advancement.module';
import {InnerModule } from './inner/company_profile/inner_banner/inner.module';
import { InnerBanner } from './entity/inner_banner.entity';
import { InnerSliderModule } from './inner/company_profile/inner_slider_images/inner_slider_image.module'
import { InnerFeature } from './entity/inner_feature.entity';
import { FeatureModule } from './inner/company_profile/feature/feature.module';
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
import { OfficeDetailsModule } from './admin/office_details/office_details.module';
import { IndiaOfficeDetailsModule } from './admin/india_office_details/india_office_details.module';
import { IndiaOfficeDetails } from './entity/india_office_details.entity';
import { ContactDetails } from './entity/contact_details.entity';
import { ContactDetailsModule } from './admin/contact_details/contact_details.module';
import { product_applications } from './entity/product_application.entity';
import { ProductApplicationsModule } from './products/product.module';
import { product_application_images } from './entity/product_application_images.entity';
import { ProductType } from './entity/product_type.entity';
import { ProductTypeModule } from './products/product_types/product_type.module';
import { SocialPlatform } from './entity/social_platform.entity';
import { ManufacturingModule } from './admin/manufacturing_unit/manufacturing_unit.module';
import { ManufacturingUnit } from './entity/manufacturing.entity';
import { ProductBrochuresModule } from './products/product_brochures/product_brochures.module';
import { ProductBrochures } from './entity/product_brochures.entity';
import { Facility } from './entity/facility.entity';
import { FacilityModule } from './admin/facility/facility.module';
import { MetaTag } from './entity/meta_tag.entity';
import { MetaTagModule } from './admin/meta_tag/meta_tag.module';
import { PipeArt } from './entity/pipe_art.entity';
import { PipeArtModule } from './admin/pipe_art/pipe_art.module';
import { PipeArtDetail } from './entity/pipe_art_details.entity';
import { Subsidiaries } from './entity/subsidiaries.entity';
import { SubsidiariesModule } from './admin/subsidiaries/subsidiaries.module';
import { Conduct } from './entity/conduct.entity';
import { ConductModule } from './admin/conduct/conduct.module';
import { CsrKey } from './entity/csr_key.entity';
import { CsrKeyModule } from './admin/community_development/csr_key/csr.module';
import { Report } from './entity/reports.entity';
import { ReportModule } from './admin/community_development/reports/reports.module';
import { Vision } from './entity/vision.entity';
import { AboutModule } from './admin/about/vision/vision.module';
import { Directors } from './entity/director.entity';
import { DirectorModule } from './admin/about/directors/director.module';
import { BoardCommitteType } from './entity/board_committee_type.entity';
import { BoardCommitteTypeModule } from './admin/about/board_committee/board_committee.module';
import { BoardCommitteDetails } from './entity/board_committe_details.entity';
import { StockYard } from './entity/stockyard.entity';
import { StockYardModule } from './admin/about/stockyard/stockyard.module';
import { Policies } from './entity/policies.entity';
import { PoliciesModule } from './admin/policies/policies.module';
import { NewsLetter } from './entity/news_letter.entity';
import { NewsLetterModule } from './admin/digital/news_letter/news_letter.module';
import { Event } from './entity/event.entity';
import { EventModule } from './admin/digital/event/event.module';
import { Content } from './entity/content.entity';
import { ContentModule } from './admin/digital/content/content.module';
import { ElectrosteelSlider } from './entity/electrosteel_slider.entity';
import { CareerModule } from './admin/career/career.module';
import { AllBanner } from './entity/all_page_banner_image.entity';
import { AllBannerModule } from './admin/all_pages_banner_image/all_pages_banner_image.module';
import { CorporateProfile } from './entity/corporate_profile.entity';
import { CorporateProfileModule } from './inner/corporate_profile/corporate_profile.module';
import { CsrOverview } from './entity/csr_overview.entity';
import { CsrReportContent } from './entity/report_content.entity';
import { LatestElectrosteel } from './entity/latest_electrosteel.entity';
import { LatestElectrosteelModule } from './admin/digital/latest_electrosteel/latest_electrosteel.module';
import { DigitalVideos } from './entity/digital_videos.entity';
import { DigitalVideosModule } from './admin/digital/videos/video.module';
import { HomeModule } from './frontend/home/home.module';
import { ConfigModule } from '@nestjs/config';
import { CommonBanner } from './entity/common_banner.entity';
import { CommonBannerModule } from './admin/common_banner_all_pages/common_banner.module';
import { BusinessEnquiry } from './entity/business_enquery.entity';
import { EnquiryModule } from './frontend/enquiry/enquiry.module';
import { ShareholderEnquiry } from './entity/shareholder_enquiry.entity';
import { EmploymentForm } from './entity/employment_form.entity';
import { EmploymentFormModule } from './admin/employment_form/employment_form.module';
import { QualityResults } from './entity/quaterly_results.entity';
import { QualityResultsModule } from './admin/investors/financials/quaterly_results/quaterly_results.module';
import { AnnualReports } from './entity/annual_reports.entity';
import { AnnualReportsModule } from './admin/investors/reports-and_account/annual_reports/annual_reports.module';
import { SubsidiariesAccount } from './entity/accounts_of_subsidiaries.entity';
import { SubsidiariesAccountModule } from './admin/investors/reports-and_account/subsidiaries_account/subsidiaries_account.module';
import { AccountOfJointVenture } from './entity/accounts_of_joint_venture.entity';
import { AccountOfJointVentureModule } from './admin/investors/reports-and_account/accounts_of_joint_venture/accounts_of_joint_venture.module';
import { NcltMeeting } from './entity/nclt_meetings.entity';
import { NcltFinalOrder } from './entity/nclt_final_order.entity';
import { NcltModule } from './admin/investors/nclt/nclt.module';
import { Blogs } from './entity/blogs.entity';
import { BlogsModule } from './admin/blogs/blogs.module';
import { SrikalahasthiAppointmentletter } from './entity/srikalahasthi_appointment_letter.entity';
import { SrikalahasthiCodeOfConductInsiders } from './entity/srikalahasthi_code_of_conduct_insiders.entity';
import { SrikalahasthiComittee } from './entity/srikalahasthi_comittee.entity';
import { srikalahasthiCodeOfConduct } from './entity/srikalahasthi_code_of_conduct.entity';
import { srikalahasthiDirectorsResignation } from './entity/srikalahasthi_directors_resignation.entity';
import { SrikalahasthiFamiliarizationProgramme } from './entity/srikalahasthi_familiarization_programme.entity';
import { SrikalahasthiInvestorContact } from './entity/srikalahasthi_investor_contact.entity';
import { SrikalahasthiNotices } from './entity/srikalahasthi_notices.entity';
import { SrikalahasthiPolicies } from './entity/srikalahasthi_policies.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'electrosteel',
      // entities: [User, Certificate, Banner, Investor, Care, Milestone, MilestoneImage, Advancement], 
      entities: [User, Certificate, Banner,Milestone, MilestoneImage, Advancement, InnerBanner, InnerFeature, Statistic, Product, SectionElectrosteel, VideoSection, Testimonial, SocialSection, Advertisement, Image,officeDetails, IndiaOfficeDetails, ContactDetails, product_applications,product_application_images, ProductType, SocialPlatform, ManufacturingUnit, ProductBrochures, Facility, MetaTag, PipeArt, PipeArtDetail, Subsidiaries, Conduct, CsrKey, Report, Vision, Directors, BoardCommitteType, BoardCommitteDetails, StockYard, Policies, NewsLetter, Event, Content, ElectrosteelSlider, AllBanner, CorporateProfile, CsrOverview, CsrReportContent, LatestElectrosteel, DigitalVideos, CommonBanner, BusinessEnquiry, ShareholderEnquiry, EmploymentForm, QualityResults, AnnualReports, SubsidiariesAccount, AccountOfJointVenture, NcltMeeting, NcltFinalOrder, Blogs, SrikalahasthiAppointmentletter, SrikalahasthiCodeOfConductInsiders, SrikalahasthiComittee, srikalahasthiCodeOfConduct, srikalahasthiDirectorsResignation, SrikalahasthiFamiliarizationProgramme, SrikalahasthiInvestorContact, SrikalahasthiNotices, SrikalahasthiPolicies   ], 
      synchronize: true, // only for dev
      // synchronize: false, 
      logging: true,
    }),
    UsersModule,
    AuthModule,
    HomesModule,
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
    FacilityModule,
    MetaTagModule,
    PipeArtModule,
    SubsidiariesModule,
    ConductModule,
    CsrKeyModule,
    ReportModule,
    AboutModule,
    DirectorModule,
    BoardCommitteTypeModule,
    StockYardModule,
    PoliciesModule,
    NewsLetterModule,
    EventModule,
    ContentModule,
    CareerModule,
    AllBannerModule,
    CorporateProfileModule,
    FeatureModule,
    LatestElectrosteelModule,
    DigitalVideosModule,
    HomeModule,
    CommonBannerModule,
    EnquiryModule,
    EmploymentFormModule,
    QualityResultsModule,
    AnnualReportsModule,
    SubsidiariesAccountModule,
    AccountOfJointVentureModule,
    NcltModule,
    BlogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
