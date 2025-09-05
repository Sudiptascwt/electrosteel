import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from '../../entity/advertisement.entity';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement])],
  providers: [AdvertisementService],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}
