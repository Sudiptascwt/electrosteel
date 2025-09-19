import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareHoldingInformation } from '../../../entity/share_holding_information.entity';
import { ShareHoldingInformationController } from './shareholding_information.controller';
import { ShareHoldingInformationService } from './shareholding_information.service';
@Module({
  imports: [TypeOrmModule.forFeature([ShareHoldingInformation])],
  controllers: [ShareHoldingInformationController],
  providers: [ShareHoldingInformationService],
})
export class ShareHoldingInformationModule {}
