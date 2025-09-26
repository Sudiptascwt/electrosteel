import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FooterService } from './footer.service';
import { FooterController } from './footer.controller';
import { officeDetails } from 'src/entity/office_section.entity';
import { SocialPlatform } from 'src/entity/social_platform.entity';
import { FooterBelowImages } from 'src/entity/footer_below_images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([officeDetails, SocialPlatform, FooterBelowImages])],
  providers: [FooterService],
  controllers: [FooterController],
})
export class FooterModule {}
