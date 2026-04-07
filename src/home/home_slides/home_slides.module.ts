import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeSlidesController } from './home_slides.controller';
import { HomeSlidesService } from './home_slides.service';
import { home_slides } from '../../entity/home_slides.entity';

@Module({
  imports: [TypeOrmModule.forFeature([home_slides])],
  controllers: [HomeSlidesController],
  providers: [HomeSlidesService],
  exports: [HomeSlidesService],
})
export class HomeSlidesModule {}