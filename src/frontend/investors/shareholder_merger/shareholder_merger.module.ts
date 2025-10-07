import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendShareholderMergerController } from './shareholder_merger.controller';
import { FrontendShareholderMergerService } from './shareholder_merger.service';
import { ShareholderMerger } from 'src/entity/shareholding_merger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShareholderMerger])],
  controllers: [FrontendShareholderMergerController],
  providers: [FrontendShareholderMergerService],
})
export class FrontendShareholderMergerModule {}
