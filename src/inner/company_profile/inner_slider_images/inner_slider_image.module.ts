import { Module } from '@nestjs/common';
import { InnerSliderService } from './inner_slider_image.service';
import { InnerSliderController } from './inner_slider_image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from '../../../entity/certificate.entity';
import { InnerBanner } from '../../../entity/inner_banner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InnerBanner]), 
  ],
  providers: [InnerSliderService],
  controllers: [InnerSliderController]
})
export class InnerSliderModule {}
