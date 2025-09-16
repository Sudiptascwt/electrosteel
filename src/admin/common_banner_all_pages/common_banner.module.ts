import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonBanner } from '../../entity/common_banner.entity';
import { CommonBannerService } from './common_banner.service';
import { CommonBannerController } from './common_banner.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CommonBanner])],
    controllers: [CommonBannerController],
    providers: [CommonBannerService],
})
export class CommonBannerModule {}
