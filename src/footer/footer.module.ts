import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from '../entity/advertisement.entity';
import { FooterService } from './footer.service';
import { FooterController } from './footer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement])],
  providers: [FooterService],
  controllers: [FooterController],
})
export class AdvertisementModule {}
