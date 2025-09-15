import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { Advancement } from 'src/entity/advancement.entity';
import { SocialSection } from 'src/entity/social_section.entity';
import { Banner } from 'src/entity/banner.entity';
import { SectionElectrosteel } from 'src/entity/section_electrosteel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advancement,SocialSection,Banner,SectionElectrosteel])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
