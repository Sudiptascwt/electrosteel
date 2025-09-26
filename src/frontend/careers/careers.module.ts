import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareersController } from './careers.controller';
import { CareersService } from './careers.service';
import { ElectrosteelSlider } from 'src/entity/electrosteel_slider.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ElectrosteelSlider])],
  controllers: [CareersController],
  providers: [CareersService],
})
export class CareersModule {}