import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllCertificate } from 'src/entity/all_certificates.entity';
import { QualityService } from './quality.service';
import { QualityController } from './quality.controller';

@Module({
    imports: [TypeOrmModule.forFeature([AllCertificate])],
    controllers: [QualityController],
    providers: [QualityService],
})
export class QualityModule {}
