import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendCommonbannerController } from './common_banner.controller';
import { FrontendCommonbannerService } from './common_banner.service';
import { CommonBanner } from 'src/entity/common_banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommonBanner])],
  controllers: [FrontendCommonbannerController],
  providers: [FrontendCommonbannerService],
})
export class FrontendCommonbannerModule {}
