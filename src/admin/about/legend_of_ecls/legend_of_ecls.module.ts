import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegendOfEclController } from './legend_of_ecls.controller';
import { LegendOfEclService } from './legend_of_ecls.service';
import { LegendHeroSection } from '../../../entity/legend_of_ecl_hero.entity';
import { LegendEclCard } from '../../../entity/legend_ecl_cards.entity';
import { LegendEclVideo } from '../../../entity/legend_ecl_video_section.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LegendHeroSection, LegendEclCard, LegendEclVideo]),
  ],
  controllers: [LegendOfEclController],
  providers: [LegendOfEclService],
})
export class LegendOfEclModule {}