import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { water_sectionController } from './water_section.controller'
import { water_sectionService } from './water_section.service';
import { water_section } from '../../entity/water_section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([water_section])],
  controllers: [water_sectionController],
  providers: [water_sectionService],
  exports: [water_sectionService],
})
export class water_sectionModule {}