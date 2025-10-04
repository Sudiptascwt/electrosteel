import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendShareHoldingPatternController } from './shareholding_pattern.controller';
import { FrontendShareHoldingPatternService } from './shareholding_pattern.service';
import { ShareHoldingInformation } from 'src/entity/share_holding_information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShareHoldingInformation])],
  controllers: [FrontendShareHoldingPatternController],
  providers: [FrontendShareHoldingPatternService],
})
export class FrontendShareHoldingPatternModule {}
