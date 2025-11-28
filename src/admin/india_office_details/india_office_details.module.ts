import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllOfficeDetails } from '../../entity/office_details.entity';
import { AllOfficeDetailsController } from './india_office_details.controller';
import { AllOfficeDetailsService } from './india_office_details.service';

@Module({
  imports: [TypeOrmModule.forFeature([AllOfficeDetails])],
  controllers: [AllOfficeDetailsController],
  providers: [AllOfficeDetailsService],
})
export class AllOfficeDetailsModule {}
