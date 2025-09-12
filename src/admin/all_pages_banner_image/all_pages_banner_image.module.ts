import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllBanner } from '../../entity/all_page_banner_image.entity';
import { AllBannerController } from './all_pages_banner_image.controller';
import { AllBannerService } from './all_pages_banner_image.service';

@Module({
  imports: [TypeOrmModule.forFeature([AllBanner])],
  controllers: [AllBannerController],
  providers: [AllBannerService],
})
export class AllBannerModule {}
