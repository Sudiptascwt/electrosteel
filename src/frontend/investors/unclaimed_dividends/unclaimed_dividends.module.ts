import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrontendUnclaimedDividendController } from './unclaimed_dividends.controller'
import { FrontendUnclaimedDividendService } from './unclaimed_dividends.service';
import { UnclaimedDividends } from 'src/entity/unclaimed_dividends.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnclaimedDividends])],
  controllers: [FrontendUnclaimedDividendController],
  providers: [FrontendUnclaimedDividendService],
})
export class FrontendUnclaimedDividendModule {}
