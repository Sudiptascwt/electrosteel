import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllCertificate } from '../../entity/all_certificates.entity';
import { QualityFeaturesService } from './quality_features.service';
import { QualityFeaturesController } from './quality_features.controller';
import { Policies } from 'src/entity/policies.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AllCertificate, Policies])],
    controllers: [QualityFeaturesController],
    providers: [QualityFeaturesService],
})
export class QualityFeaturesModule {}
