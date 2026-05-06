import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutFrontendController } from './about.controller';
import { AboutFrontendService } from './about.service';

import { AboutMain } from '../../entity/about_main.entity';
import { growing_strength_data } from 'src/entity/growing_strength_data.entity';
import { AboutDuctileIron } from 'src/entity/about_ductile_iron.entity';
import { ManufacturingFacilities } from 'src/entity/manufacturing_facilities.entity';
import { headings } from 'src/entity/headings.entity';
import { AboutPeopleData } from 'src/entity/about_people_data.entity';
import { about_technology_innovation } from 'src/entity/about_technology_innovation.entity';
import { Vision } from 'src/entity/vision.entity';
import { VisionPrinciples } from 'src/entity/vision_principles.entity';
import { Mission } from 'src/entity/mission.entity';
import { board_commitee_hero_data } from 'src/entity/board_commitee_hero_data.entity';
import { BoardCommitteData } from 'src/entity/board_commitee_data.entity';
import { Directors } from 'src/entity/director.entity';
import { AllPagesTitle } from 'src/entity/all_page_title.entity';

import { ProcessInnovationHero } from 'src/entity/process_innovation_hero.entity';
import { PipesToInhospitableKargil } from 'src/entity/pipes_to_inhospitable_kargil.entity';
import { ElectrosteelIsro } from 'src/entity/electrosteel_isro.entity';
import { ReachingStars } from 'src/entity/ReachingStars.entity';
import { ViaHelicopter } from 'src/entity/ViaHelicopter.entity';
import { UltimateDIPipes } from 'src/entity/UltimateDIPipes.entity';
import { changiWater } from 'src/entity/changiWater.entity';

import { ProductInnovationHeroSection } from 'src/entity/product_innovation_hero_section.entity';
import { ElectrolockJoint  } from 'src/entity/electrolock_joint.entity';
import { TrenchlessDIPipes } from 'src/entity/trenchless-di-pipes.entity';
import { PolyurethaneLining } from 'src/entity/polyurethane-lining.entity';
import { PolyurethaneCoating } from 'src/entity/polyurethane-coating.entity';

import { LegendHeroSection } from 'src/entity/legend_of_ecl_hero.entity';
import { LegendEclCard } from 'src/entity/legend_ecl_cards.entity';
import { LegendEclVideo } from 'src/entity/legend_ecl_video_section.entity';

import { Milestone } from 'src/entity/milestones.entity';
import { MilestoneBanner } from 'src/entity/milestone_banner.entity';

import { SectionContent } from 'src/entity/section_contents.entity';
import { Testimonial } from 'src/entity/testimonials.entity';
import { Reward } from 'src/entity/rewards.entity';
import { Blogs } from 'src/entity/blogs.entity';
import { AllBanner } from 'src/entity/all_page_banner_image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AboutMain,
      growing_strength_data,
      AboutDuctileIron,
      ManufacturingFacilities,
      headings,
      AboutPeopleData,
      about_technology_innovation,
      Vision,
      VisionPrinciples,
      Mission,
      board_commitee_hero_data,
      BoardCommitteData,
      Directors,
      AllPagesTitle,
      ProcessInnovationHero,
      PipesToInhospitableKargil,
      ElectrosteelIsro,
      ReachingStars,
      ViaHelicopter,
      UltimateDIPipes,
      changiWater,
      ProductInnovationHeroSection,
      ElectrolockJoint,
      TrenchlessDIPipes,
      PolyurethaneLining,
      PolyurethaneCoating,
      LegendHeroSection,
      LegendEclCard,
      LegendEclVideo,
      Milestone,
      MilestoneBanner,
      SectionContent,
      Testimonial,
      Reward,
      Blogs,
      AllBanner
    ]),
  ],
  controllers: [AboutFrontendController],
  providers: [AboutFrontendService],
})
export class AboutFrontendModule {}