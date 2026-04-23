import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { Advertisement } from 'src/entity/advertisement.entity';
import { home_slides } from '../../entity/home_slides.entity';
import { mini_stats } from '../../entity/mini_stats.entity';
import { OverviewSection } from '../../entity/overview_section.entity';
import { ecl_products } from '../../entity/ecl_products.entity';
import { headings } from 'src/entity/headings.entity';
import { growing_from_strength } from '../../entity/growing_from_strength.entity';
import {water_section } from '../../entity/water_section.entity';
import { Milestone } from '../../entity/milestones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement, home_slides, mini_stats, OverviewSection, ecl_products, headings, growing_from_strength, water_section, Milestone])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
