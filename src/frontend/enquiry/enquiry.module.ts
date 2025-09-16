import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessEnquiry } from '../../entity/business_enquery.entity';
import { EnquiryController } from './Enquiry.controller';
import { EnquiryService } from './Enquiry.service';
import { ShareholderEnquiry } from 'src/entity/shareholder_enquiry.entity';
import { CareerEnquiry } from 'src/entity/career_enquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEnquiry, ShareholderEnquiry, CareerEnquiry])],
  controllers: [EnquiryController],
  providers: [EnquiryService],
})
export class EnquiryModule {}
