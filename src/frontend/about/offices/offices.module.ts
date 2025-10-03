import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficesController } from './Offices.controller';
import { OfficesService } from './Offices.service';
import { IndiaOfficeDetails } from 'src/entity/office_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndiaOfficeDetails])],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export class OfficesModule {}
