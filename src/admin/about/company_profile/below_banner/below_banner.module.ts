import { Module } from '@nestjs/common';
import { BelowBannerService } from './below_banner.service';
import { BelowBannerController } from './below_banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BelowBanner } from '../../../../entity/below_banner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BelowBanner]), 
  ],
  providers: [BelowBannerService],
  controllers: [BelowBannerController]
})
export class BelowBannerModule {}
