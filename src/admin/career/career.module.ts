import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectrosteelSlider } from '../../entity/electrosteel_slider.entity';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { LifeElectrosteelContent } from 'src/entity/life_electrosteel_content.entity';
import { FraudAlert } from 'src/entity/fraud_alert.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ElectrosteelSlider, LifeElectrosteelContent, FraudAlert])],
    controllers: [CareerController],
    providers: [CareerService],
})
export class CareerModule {}
