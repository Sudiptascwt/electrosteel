import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutMain } from '../../../entity/about_main.entity';
import { AboutMainService } from './about_main.service';
import { AboutMainController } from './about_main.controller';
import { growing_strength_data } from 'src/entity/growing_strength_data.entity';
import { AboutDuctileIron } from 'src/entity/about_ductile_iron.entity';
import { ManufacturingFacilities } from 'src/entity/manufacturing_facilities.entity';
import { headings } from 'src/entity/headings.entity';
import { AboutPeopleData } from 'src/entity/about_people_data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AboutMain, growing_strength_data, AboutDuctileIron, ManufacturingFacilities, headings, AboutPeopleData])],
  providers: [AboutMainService],
  controllers: [AboutMainController],
})
export class AboutMainModule {}
