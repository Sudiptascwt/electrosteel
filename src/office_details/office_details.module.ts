import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { officeDetails } from '../entity/office_section.entity';
import { OfficeDetailsService } from './office_details.service';
import { OfficeDetailsController } from './office_details.controller';

@Module({
    imports: [TypeOrmModule.forFeature([officeDetails])],
    controllers: [OfficeDetailsController],
    providers: [OfficeDetailsService],
})
export class OfficeDetailsModule {}
