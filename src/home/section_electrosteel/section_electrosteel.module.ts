import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionElectrosteel } from '../../entity/section_electrosteel.entity';
import { SectionElectrosteelService } from './section_electrosteel.service';
import { SectionElectrosteelController } from './section_electrosteel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SectionElectrosteel])],
  providers: [SectionElectrosteelService],
  controllers: [SectionElectrosteelController],
})
export class SectionElectrosteelModule {}
