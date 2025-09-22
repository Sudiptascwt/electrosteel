import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnclaimedDividends } from '../../../entity/unclaimed_dividends.entity';
import { UnclaimedDividendsImages } from 'src/entity/unclaimed_dividends_images.entity';
import { UnclaimedDividendsController } from './unclaimed_dividends.controller';
import { UnclaimedDividendsService } from './unclaimed_dividends.service';
@Module({
  imports: [TypeOrmModule.forFeature([UnclaimedDividends, UnclaimedDividendsImages])],
  controllers: [UnclaimedDividendsController],
  providers: [UnclaimedDividendsService],
})
export class UnclaimedDividendsModule {}
