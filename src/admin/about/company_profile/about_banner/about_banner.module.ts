import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutBanner } from '../../../../entity/company_profile_banner.entity';
import { AboutBannerService } from './about_banner.service';
import { AboutBannerController } from './about_banner.controller';
@Module({
    imports: [TypeOrmModule.forFeature([AboutBanner])],
    controllers: [AboutBannerController],
    providers: [AboutBannerService],
})
export class AboutBannerModule {}
