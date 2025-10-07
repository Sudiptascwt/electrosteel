import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';
import { IndiaOfficeDetails } from 'src/entity/office_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndiaOfficeDetails])],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export class OfficesModule {}
