import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndiaOfficeDetails } from '../../entity/india_office_details.entity';
import { IndiaOfficeDetailsController } from './india_office_details.controller';
import { IndiaOfficeDetailsService } from './india_office_details.service';

@Module({
  imports: [TypeOrmModule.forFeature([IndiaOfficeDetails])],
  controllers: [IndiaOfficeDetailsController],
  providers: [IndiaOfficeDetailsService],
})
export class IndiaOfficeDetailsModule {}
