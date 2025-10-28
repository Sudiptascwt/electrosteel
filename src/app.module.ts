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
import { IndiaOfficeDetails } from './entity/office_details.entity';
import { ContactDetails } from './entity/contact_details.entity';
import { ContactDetailsModule } from './admin/contact_details/contact_details.module';
import { product_applications } from './entity/product_application.entity';
import { ProductApplicationsModule } from './admin/products/product.module';
import { product_application_images } from './entity/product_application_images.entity';
import { ProductType } from './entity/product_type.entity';
import { ProductTypeModule } from './admin/products/product_types/product_type.module';
import { SocialPlatform } from './entity/social_platform.entity';
import { ManufacturingModule } from './admin/manufacturing_unit/manufacturing_unit.module';
import { ManufacturingUnit } from './entity/manufacturing.entity';
import { ProductBrochuresModule } from './admin/products/product_brochures/product_brochures.module';
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
import { SrikalahasthiDirectorsResignation } from './entity/srikalahasthi_directors_resignation.entity';
import { SrikalahasthiFamiliarizationProgramme } from './entity/srikalahasthi_familiarization_programme.entity';
import { SrikalahasthiInvestorContact } from './entity/srikalahasthi_investor_contact.entity';
import { SrikalahasthiNotices } from './entity/srikalahasthi_notices.entity';
import { SrikalahasthiPolicies } from './entity/srikalahasthi_policies.entity';
import { Srikalahasthi } from './entity/Srikalahasthi.entity';
import { SrikalahasthiModule } from './admin/investors/amalgamation/srikalahasthi_pipes/srikalahasthi_pipes.module';
import { ShareHoldingInformation } from './entity/share_holding_information.entity';
import { ShareHoldingInformationModule } from './admin/investors/shareholding_information/shareholding_information.module';
import { SrikalahasthiPoliciesModule } from './admin/investors/amalgamation/srikalahasthi_pipes/srikalahasthi_policies/srikalahasthi_policies.module';
import { SrikalahasthiNoticesModule } from './admin/investors/amalgamation/srikalahasthi_pipes/srikalahasthi_notices/srikalahasthi_notices.module';
import { SrikalahasthiInvestorContactModule } from './admin/investors/amalgamation/srikalahasthi_pipes/srikalahasthi_investor_contact/srikalahasthi_investor_contact.module';
import { SrikalahasthiFamiliarizationProgrammeModule } from './admin/investors/amalgamation/srikalahasthi_pipes/srikalahasthi_familiarization_programme/srikalahasthi_familiarization_programme.module';
import { SrikalahasthiDirectorsResignationModule } from './admin/investors/amalgamation/srikalahasthi_pipes/srikalahasthi_directors_resignation/srikalahasthi_directors_resignation.module';
import { SrikalahasthiCommiteeModule } from './admin/investors/amalgamation/srikalahasthi_pipes/srikalahasthi_comittee/srikalahasthi_comittee.module';
import { SrikalahasthiCodeOfConductInsidersModule } from './admin/investors/amalgamation/srikalahasthi_pipes/srikalahasthi_code_of_conduct_insiders/srikalahasthi_code_of_conduct_insiders.module';
import { srikalahasthi_appointment_letterModule } from './admin/investors/amalgamation/srikalahasthi_pipes/srikalahasthi_appointment_letter/srikalahasthi_appointment_letter.module';
import { NewsPaperPublication } from './entity/newspaper_publication.entity';
import { NewspaperPublicationModule } from './admin/investors/newspaper_publication/newspaper_publication.module';
import { CorporateGovernance } from './entity/corporate_governance.entity';
import { CorporateGovernanceModule } from './admin/investors/corporate_governance/corporate_governance.module';
import { ShareholderMerger } from './entity/shareholding_merger.entity';
import { ShareholdingMergerModule } from './admin/investors/shareholding_merger/shareholding_merger.module';
import { Notices } from './entity/notices.entity';
import { NoticesModule } from './admin/investors/notices/notices.module';
import { Notices160 } from './entity/160_notice.entity';
import { Notices160Module } from './admin/investors/160_notices/160_notices.module';
import { VotingResults } from './entity/voting_results.entity';
import { Voting_resultsModule } from './admin/investors/voting_results/voting_results.module';
import { IepfSuspense } from './entity/iepf_suspense.entity';
import { IepfSuspenseModule } from './admin/investors/iepf_suspense/iepf_suspense.module';
import { UnclaimedDividends } from './entity/unclaimed_dividends.entity';
import { UnclaimedDividendsModule } from './admin/investors/unclaimed_dividends/unclaimed_dividends.module';
import { UnclaimedDividendsImages } from './entity/unclaimed_dividends_images.entity'; 
import { AnnualReturn } from './entity/annual_return.entity';
import { AnnualReturnModule } from './admin/investors/annual_return/annual_return.module';
import { InvestorRelation } from './entity/investor_relation.entity';
import { InvestorRelationModule } from './admin/investors/investor_relation/investor_relation.module';
import { AuthorisedKmp } from './entity/authorised_kmp.entity';
import { InvestorStockInfo } from './entity/investor_stock_info.entity';
import { CreditRatings } from './entity/credit_ratings.entity';
import { CreditRatingsModule } from './admin/investors/credit_ratings/credit_ratings.module';
import { InvestorPresentation } from './entity/investor_presentation.entity';
import { InvestorPresentationModule } from './admin/investors/investor_presentation/investor_presentation.module';
import { InvestorDocuments } from './entity/investor_documents.entity';
import { InvestorDocumentsModule } from './admin/investors/investor_documents/investor_documents.module';
import { CsrProjects } from './entity/csr_projects.entity';
import { CsrProjectsModule } from './admin/investors/csr_projects/csr_projects.module';
import { FooterModule } from './footer/footer.module'
import { FooterBelowImages } from './entity/footer_below_images.entity';
import { Jolsadhana } from './entity/jol_sadhana.entity';
import { JolsadhanaModule } from './admin/jol_sadhana/jol_sadhana.module';
import { QualityModule } from './frontend/quality/quality.module';
import { AllCertificate } from './entity/all_certificates.entity';
import { QualityFeaturesModule } from './admin/quality_features/quality_features.module';
import { CareersModule } from './frontend/careers/careers.module';
import { FrontendFacilityModule } from './frontend/facility/facility.module';
import { StockyardsModule } from './frontend/about/stockyards/stockyards.module';
import { FrontendSubsidiariesModule } from './frontend/about/subsidiaries/subsidiaries.module';
import { FrontendJolsadhanaModule } from './frontend/jolsadhana/jolsadhana.module';
import { OfficesModule } from './frontend/about/offices/offices.module';
import { CsrModule } from './frontend/csr/csr.module';
import { FrontendLatestElectrosteelModule } from './frontend/digital/latest_electrosteel/latest_electrosteel.module';
import { FrontendNewsletterModule } from './frontend/digital/news_letters/news_letters.module';
import { FrontendEventsModule } from './frontend/digital/events/events.module';
import { FrontendVideosModule } from './frontend/digital/videos/videos.module';
import { FrontendCommonbannerModule } from './frontend/common_banner/common_banner.module';
import { FrontendQuartelyResultModule } from './frontend/investors/quarterly_results/quarterly_results.module';
import { FrontendAnnualReportsModule } from './frontend/investors/annual_reports/annual_reports.module';
import { FrontendAccountofJointVentureModule } from './frontend/investors/account_of_joint_venture/account_of_joint_venture.module';
import { FrontendCodeOfConductModule } from './frontend/investors/code_of_conduct/code_of_conduct.module';
import { FrontendNcltMeetingsModule } from './frontend/investors/nclt_meetings/nclt_meetings.module';
import { FrontendNcltFinalOrderModule } from './frontend/investors/nclt_final_order/nclt_final_order.module';
import { Regulation } from './entity/regulation.entity';
import { RegulationModule } from './admin/investors/regulation_37/regulation_37.module';
import { FrontendRegulationModule } from './frontend/investors/regulation/regulation.module';
import { FrontendShareHoldingPatternModule } from './frontend/investors/shareholding_pattern/shareholding_pattern.module';
import { FrontendNewsPaperPublicationModule } from './frontend/investors/news_paper_publication/news_paper_publication.module';
import { FrontendcorporateGovernanceModule } from './frontend/investors/corporate_governance/corporate_governance.module';
import { FrontendShareholderMergerModule } from './frontend/investors/shareholder_merger/shareholder_merger.module';
import { FrontendNoticesModule } from './frontend/investors/notices/notices.module';
import { frontend_160_notice_module } from './frontend/investors/160_notices/160_notices.module';
import { FrontendVotingResultsModule } from './frontend/investors/voting_results/voting_results.module';
import { FrontendIepfSuspenseModule } from './frontend/investors/iepf_suspense_account/iepf_suspense_account.module';
import { FrontendUnclaimedDividendModule } from './frontend/investors/unclaimed_dividends/unclaimed_dividends.module';
import { FrontendAnnualReturnModule } from './frontend/investors/annual_return/annual_return.module';
import { FrontendInvestorRelationModule } from './frontend/investors/investor_relations/investor_relations.module';
import { FrontendCreditRatingsModule } from './frontend/investors/credit_ratings/credit_ratings.module';
import { FrontendInvestorPresentationDocumentsModule } from './frontend/investors/investor_presentation_and_documents/investor_presentation_and_documents.module';
import { FrontendCsrProjectModule } from './frontend/investors/csr_projects/csr_projects.module';
///activity logs
import { LoggingMiddleware } from './common/activity-logs/logging.middleware'
import { ActivityLogSubscriber } from './common/activity-logs/activity-log.subscriber';
import { AllExceptionsFilter } from './common/activity-logs/all-exceptions.filter';
import { ActivityLog } from './entity/activity-log.entity'
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ProductDuctileIronModule } from './admin/products/product_duc_iron/product_ductile_iron_pipes.module';
import { DuctileIronPipesOverview } from './entity/ductile_iron_pipes_overview.entity';
import { DuctileIronPipeDetails } from './entity/ductile_iron_pipes_details.entity';
import { DuctileIronPipeApplications } from './entity/ductile_iron_pipes_application.entity';
import { PipesJointing } from './entity/pipes_jointing.entity';
import { PipesJointingDetails } from './entity/pipes_jointing_details.entity';
import { InternalPipes } from './entity/pipes_internal.entity';
import { ExternalPipes } from './entity/pipes_external.entity';
import { InternalPipesModule } from './admin/products/product_duc_iron/internal_pipes/internal_pipes.module';
import { ExternalPipesModule } from './admin/products/product_duc_iron/external_pipes/external_pipes.module';
import { ProductDuctileIronFittingsModule } from './admin/products/product_ductile_iron_fittings/product_ductile_iron_fittings.module';
import { DuctileIronFittingsOverview } from './entity/ductile_iron_fittings_overview.entity';
import { DuctileIronFittingsDetails } from './entity/ductile_iron_fittings_details.entity';
import { DuctileIronFittingsApplications } from './entity/ductile_iron_fittings_application.entity';
import { FittingsPipesJointing } from './entity/ductile_iron_fittings_pipe_jointing.entity';
import { FittingsPipesJointingDetails } from './entity/ductile_iron_fittings_pipes_jointing_details.entity';
import { FittingsExternalsModule } from './admin/products/product_duc_iron/external_pipes/fittings_external_pipes.module';
import { FittingsInternalModule } from './admin/products/product_duc_iron/internal_pipes/fittings_internal_pipes.module';
import { FittingsExternalPipes } from './entity/fittings_external.entity';
import { FittingsInternalPipes } from './entity/fittings_internal.entity';
import { FrontendBlogsModule } from './frontend/blogs/blogs.module';
import { DisclosuresModule } from './admin/investors/disclosures/disclosures.module';
import { Disclosure } from './entity/disclosure.entity';
import { DisclosureImages } from './entity/disclosure_images.entity';
import { OtherDisclosure } from './entity/other_disclosures.entity';
import { FrontendClosureModule } from './frontend/investors/closures/closures.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: '',
      // database: 'electrosteel',  type: 'mysql', // or 'postgres'
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      type: 'mysql', 
      // entities: [User, Certificate, Banner, Investor, Care, Milestone, MilestoneImage, Advancement], 
      entities: [User, Certificate, Banner,Milestone, MilestoneImage, Advancement, InnerBanner, InnerFeature, Statistic, Product, SectionElectrosteel, VideoSection, Testimonial, SocialSection, Advertisement, Image,officeDetails, IndiaOfficeDetails, ContactDetails, product_applications,product_application_images, ProductType, SocialPlatform, ManufacturingUnit, ProductBrochures, Facility, MetaTag, PipeArt, PipeArtDetail, Subsidiaries, Conduct, CsrKey, Report, Vision, Directors, BoardCommitteType, BoardCommitteDetails, StockYard, Policies, NewsLetter, Event, Content, ElectrosteelSlider, AllBanner, CorporateProfile, CsrOverview, CsrReportContent, LatestElectrosteel, DigitalVideos, CommonBanner, BusinessEnquiry, ShareholderEnquiry, EmploymentForm, QualityResults, AnnualReports, SubsidiariesAccount, AccountOfJointVenture, NcltMeeting, NcltFinalOrder, Blogs, SrikalahasthiAppointmentletter, SrikalahasthiCodeOfConductInsiders, SrikalahasthiComittee, srikalahasthiCodeOfConduct, SrikalahasthiDirectorsResignation, SrikalahasthiFamiliarizationProgramme, SrikalahasthiInvestorContact, SrikalahasthiNotices, SrikalahasthiPolicies, ShareHoldingInformation, Srikalahasthi, NewsPaperPublication, CorporateGovernance, ShareholderMerger, Notices, Notices160, VotingResults, IepfSuspense, UnclaimedDividends, UnclaimedDividendsImages, AnnualReturn, InvestorRelation, AuthorisedKmp, InvestorStockInfo, CreditRatings, InvestorPresentation, InvestorDocuments, CsrProjects, FooterBelowImages, Jolsadhana,AllCertificate, Regulation, ActivityLog, DuctileIronPipesOverview, DuctileIronPipeDetails, DuctileIronPipeApplications, PipesJointing, PipesJointingDetails, InternalPipes, ExternalPipes, DuctileIronFittingsOverview, DuctileIronFittingsDetails,DuctileIronFittingsApplications, FittingsPipesJointing, FittingsPipesJointingDetails, FittingsExternalPipes, FittingsInternalPipes, Disclosure, DisclosureImages, OtherDisclosure], 
      // synchronize: true, // only for dev

      synchronize: false, 
      logging: true,
      subscribers: [ActivityLogSubscriber],
    }),
    TypeOrmModule.forFeature([ActivityLog]),
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
    BlogsModule,
    ShareHoldingInformationModule,
    SrikalahasthiModule,
    SrikalahasthiPoliciesModule,
    SrikalahasthiNoticesModule,
    SrikalahasthiInvestorContactModule,
    SrikalahasthiFamiliarizationProgrammeModule,
    SrikalahasthiDirectorsResignationModule,
    SrikalahasthiCommiteeModule,
    SrikalahasthiCodeOfConductInsidersModule,
    srikalahasthi_appointment_letterModule,
    NewspaperPublicationModule,
    CorporateGovernanceModule,
    ShareholdingMergerModule,
    NoticesModule,
    Notices160Module,
    Voting_resultsModule,
    IepfSuspenseModule,
    UnclaimedDividendsModule,
    AnnualReturnModule,
    InvestorRelationModule,
    CreditRatingsModule,
    InvestorPresentationModule,
    InvestorDocumentsModule,
    CsrProjectsModule,
    FooterModule,
    JolsadhanaModule,
    QualityModule,
    QualityFeaturesModule,
    CareersModule,
    FrontendFacilityModule,
    StockyardsModule,
    FrontendSubsidiariesModule,
    FrontendJolsadhanaModule,
    OfficesModule,
    CsrModule,
    FrontendLatestElectrosteelModule,
    FrontendNewsletterModule,
    FrontendEventsModule,
    FrontendVideosModule,
    FrontendCommonbannerModule,
    FrontendQuartelyResultModule,
    FrontendAnnualReportsModule,
    FrontendAccountofJointVentureModule,
    FrontendCodeOfConductModule,
    FrontendNcltMeetingsModule,
    FrontendNcltFinalOrderModule,
    RegulationModule,
    FrontendRegulationModule,
    FrontendShareHoldingPatternModule,
    FrontendNewsPaperPublicationModule,
    FrontendcorporateGovernanceModule,
    FrontendShareholderMergerModule,
    FrontendNoticesModule,
    frontend_160_notice_module,
    FrontendVotingResultsModule,
    FrontendIepfSuspenseModule,
    FrontendUnclaimedDividendModule,
    FrontendAnnualReturnModule,
    FrontendInvestorRelationModule,
    FrontendCreditRatingsModule,
    FrontendInvestorPresentationDocumentsModule,
    FrontendCsrProjectModule,
    ProductDuctileIronModule,
    InternalPipesModule,
    ExternalPipesModule,
    ProductDuctileIronFittingsModule,
    FittingsExternalsModule,
    FittingsInternalModule,
    FrontendBlogsModule,
    DisclosuresModule,
    FrontendClosureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // all routes
  }
}
