import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificate } from '../../../../entity/certificate.entity';
import { InnerFeature } from '../../../../entity/inner_feature.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InnerFeature]), 
  ],
  providers: [FeatureService],
  controllers: [FeatureController]
})
export class FeatureModule {}
