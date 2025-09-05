import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialSection } from '../../entity/social_section.entity';
import { SocialSectionService } from './social_section.service';
import { SocialSectionController } from './social_section.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SocialSection])],
  providers: [SocialSectionService],
  controllers: [SocialSectionController],
})
export class SocialSectionModule {}
