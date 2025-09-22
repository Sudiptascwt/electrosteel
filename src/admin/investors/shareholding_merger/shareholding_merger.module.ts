import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareholderMerger } from '../../../entity/shareholding_merger.entity';
import { ShareholdingMergerController } from './shareholding_merger.controller';
import { ShareholdingMergerService } from './shareholding_merger.service';
@Module({
  imports: [TypeOrmModule.forFeature([ShareholderMerger])],
  controllers: [ShareholdingMergerController],
  providers: [ShareholdingMergerService],
})
export class ShareholdingMergerModule {}
