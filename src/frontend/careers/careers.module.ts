import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareersController } from './careers.controller';
import { CareersService } from './careers.service';
import { ElectrosteelSlider } from 'src/entity/electrosteel_slider.entity';
import { FraudAlert } from 'src/entity/fraud_alert.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ElectrosteelSlider, FraudAlert])],
  controllers: [CareersController],
  providers: [CareersService],
})
export class CareersModule {}